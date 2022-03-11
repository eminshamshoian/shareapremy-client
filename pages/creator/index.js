import { useState, useEffect } from "react";
import axios from "axios";
import CreatorRoute from "../../components/Routes/CreatorRoute";
import { Image, Button } from "antd";
import Link from "next/link";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const CreatorIndex = () => {
  const [videos, setCollections] = useState([]);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    const { data } = await axios.get("/api/creator-collections");
    setCollections(data);
  };

  const myStyle = { fontSize: "25px", color: "black" };

  return (
    <CreatorRoute>
      <h1 className='text-center p-5 mb-4 '>Creator Dashboard</h1>
      {videos &&
        videos.map((collection) => (
          <>
            <div className='media pt-5 my-5 container collection-list'>
              <Image
                height={100}
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
                        <h5
                          className='pt-2 mt-4'
                          style={{
                            fontSize: "22px",
                            textTransform: "uppercase",
                          }}
                        >
                          {collection.name}
                        </h5>
                      </a>
                    </Link>
                    <p
                      style={{
                        color: "black",
                        width: "50%",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                      }}
                    >
                      {collection.videos.length} Videos' in Collection
                    </p>
                    <Button
                      className='col-md-2 main-btn'
                      style={{ height: "50px", borderRadius: "5px" }}
                    >
                      <Link
                        href={`/creator/collection/view/${collection.slug}`}
                      >
                        View Collection
                      </Link>
                    </Button>
                    <hr className='mt-5' style={{ color: "black" }} />
                    {collection.videos.length < 1 ? (
                      <p style={myStyle}>
                        <CloseCircleOutlined style={{ color: "red" }} /> Upload
                        a Video To Publish{" "}
                      </p>
                    ) : collection.published ? (
                      <p style={myStyle}>
                        <CheckCircleOutlined style={{ color: "green" }} />
                        Your collection is live in the marketplace
                      </p>
                    ) : (
                      <p style={myStyle}>
                        <CheckCircleOutlined style={{ color: "orange" }} /> Your
                        collection is ready to be published
                      </p>
                    )}
                  </div>

                  <div className=' text-left pointe pt-5'>
                    {collection.published ? (
                      <Button className='col-md-12 text-center long-btn'>
                        <Link
                          href={`/creator/collection/view/${collection.slug}`}
                          className='pointer'
                        >
                          <a className='mt-2'>
                            <CloseCircleOutlined className='h5 pointer text-warning' />
                            Unpublish Collection
                          </a>
                        </Link>
                      </Button>
                    ) : collection.videos.length < 1 ? (
                      <Button className='col-md-12 text-center long-btn'>
                        <Link
                          href={`/creator/collection/view/${collection.slug}`}
                          className='pointer'
                        >
                          <a className='mt-2'>
                            <UploadOutlined className='h5 pointer text-danger' />{" "}
                            Add A Video
                          </a>
                        </Link>
                      </Button>
                    ) : (
                      <Button className='col-md-12 text-center long-btn'>
                        <Link
                          href={`/creator/collection/view/${collection.slug}`}
                          className='pointer'
                        >
                          <a className='mt-2'>
                            <CheckCircleOutlined className='h5 pointer text-success' />{" "}
                            Publish Collection
                          </a>
                        </Link>
                      </Button>
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
