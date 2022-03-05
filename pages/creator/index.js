import { useState, useEffect } from "react";
import axios from "axios";
import CreatorRoute from "../../components/Routes/CreatorRoute";
import { Avatar } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const CreatorIndex = () => {
  const [videos, setCollections] = useState([]);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    const { data } = await axios.get("/api/creator-collections");
    setCollections(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "20px" };

  return (
    <CreatorRoute>
      <h1 className='text-center p-5 mb-4 '>Creator Dashboard</h1>
      {videos &&
        videos.map((collection) => (
          <>
            <div className='media pt-2'>
              <Avatar
                size={120}
                src={
                  collection.image
                    ? collection.image.Location
                    : "/collection.png"
                }
              />

              <div className='media-body pl-2'>
                <div className='row'>
                  <div className='col'>
                    <Link
                      href={`/creator/collection/view/${collection.slug}`}
                      className='pointer'
                    >
                      <a className='mt-2 text-primary'>
                        <h5 className='pt-2'>{collection.name}</h5>
                      </a>
                    </Link>
                    <p style={{ marginTop: "-10px" }}>
                      {collection.videos.length} videos
                    </p>

                    {collection.videos.length < 5 ? (
                      <p style={myStyle}>
                        At least 5 videos are required to publish a collection
                      </p>
                    ) : collection.published ? (
                      <p style={myStyle}>
                        Your collection is live in the marketplace
                      </p>
                    ) : (
                      <p style={myStyle}>
                        Your collection is ready to be published
                      </p>
                    )}
                  </div>

                  <div className='col-md-3 mt-3 text-center'>
                    {collection.published ? (
                      <div>
                        <CheckCircleOutlined className='h5 pointer text-success' />
                      </div>
                    ) : (
                      <div>
                        <CloseCircleOutlined className='h5 pointer text-warning' />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </CreatorRoute>
  );
};

export default CreatorIndex;
