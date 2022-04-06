import React, { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SubscriberRoute from "../../../components/Routes/SubscriberRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

const { Item } = Menu;

const SingleCollection = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState({ videos: [] });

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadlCollection();
  }, [slug]);

  const loadlCollection = async () => {
    const { data } = await axios.get(`/api/user/collection/${slug}`);
    setCollection(data);
  };

  return (
    <SubscriberRoute>
      <div className='row'>
        <div className='col-lg-2'>
          <Button
            onClick={() => setCollapsed(!collapsed)}
            className='text-primary mt-1 btn-block mb-2'
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{" "}
            {!collapsed && "videos"}
          </Button>
          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: "90vh", overflow: "auto " }}
          >
            {collection.videos.map((video, index) => (
              <Item
                onClick={() => setClicked(index)}
                key={index}
                icon={<Avatar>{index + 1}</Avatar>}
              >
                {video.title.substring(0, 30)}{" "}
              </Item>
            ))}
          </Menu>
        </div>
        <div className='col-lg-10 p-2'>
          {clicked !== -1 ? (
            <>
              {collection.videos[clicked].video &&
                collection.videos[clicked].video.Location && (
                  <>
                    <div className='wrapper'>
                      <ReactPlayer
                        className='player'
                        url={collection.videos[clicked].video.Location}
                        width='100%'
                        height='100%'
                        controls
                        onEnded={() => markCompleted()}
                      />
                    </div>
                  </>
                )}
              <ReactMarkdown
                source={collection.videos[clicked].content}
                className='single-post'
              />
            </>
          ) : (
            <div className='d-flex justify-content-center p-5'>
              <div className='text-center p-5'>
                <PlayCircleOutlined className='text-primary display-1 p-5' />
                <p className='lead'>Clcik on the videos to start learning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SubscriberRoute>
  );
};

export default SingleCollection;
