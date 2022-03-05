import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CreatorRoute from "../../../../components/Routes/CreatorRoute";
import axios from "axios";
import { Avatar, Tooltip } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

const CourseView = () => {
  const [collection, setCollection] = useState({});

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCollection();
  }, [slug]);

  const loadCollection = async () => {
    const { data } = await axios.get(`/api/collection/${slug}`);
    setCollection(data);
  };

  return (
    <CreatorRoute>
      <div className='contianer-fluid pt-3'>
        {/* <pre>{JSON.stringify(collection, null, 4)}</pre> */}
        {collection && (
          <div className='container-fluid pt-1'>
            <div className='media pt-2'>
              <Avatar
                size={80}
                src={
                  collection.image
                    ? collection.image.Location
                    : "/collection.png"
                }
              />

              <div className='media-body pl-2'>
                <div className='row'>
                  <div className='col'>
                    <h5 className='mt-2 text-primary'>{collection.name}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {collection.videos && collection.videos.length} videos
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {collection.category}
                    </p>
                  </div>

                  <div className='d-flex pt-4'>
                    <Tooltip title='Edit'>
                      <EditOutlined className='h5 pointer text-warning mr-4' />
                    </Tooltip>
                    <Tooltip title='Publish'>
                      <CheckOutlined className='h5 pointer text-danger' />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col'>
                <ReactMarkdown children={collection.description} />
              </div>
            </div>
          </div>
        )}
      </div>
    </CreatorRoute>
  );
};

export default CourseView;
