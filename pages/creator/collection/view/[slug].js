import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CreatorRoute from "../../../../components/Routes/CreatorRoute";
import axios from "axios";
import { Avatar, Button, Modal, Tooltip, List } from "antd";
import { EditOutlined, CheckOutlined, UploadOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddVideoForm from "../../../../components/forms/AddVideoForm";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";

const CourseView = () => {
  const [collection, setCollection] = useState({});
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCollection();
  }, [slug]);

  const loadCollection = async () => {
    const { data } = await axios.get(`/api/collection/${slug}`);
    setCollection(data);
  };

  // Video upload functions
  const handleAddVideo = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.post(
        `/api/collection/video/${slug}/${collection.creator._id}`,
        values
      );
      // console.log(data)
      setValues({ ...values, title: "", content: "", video: {} });
      setVisible(false);
      setUploadButtonText("Upload video");
      setCollection(data);
      toast("video added");
    } catch (err) {
      console.log(err);
      toast("video add failed");
    }
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/collection/video-upload/${collection.creator._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      // once response is received
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video upload failed");
    }
  };

  const handleVideoRemove = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/collection/video-remove/${collection.creator._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButtonText("Upload another video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video remove failed");
    }
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
            <div className='row'>
              <Button
                onClick={() => setVisible(true)}
                className='col-md-6 offset-md-3 text-center'
                type='primary'
                shape='round'
                icon={<UploadOutlined />}
                size='large'
              >
                Add Video
              </Button>
            </div>
            <br />
            <Modal
              title='+ Add Video'
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <AddVideoForm
                values={values}
                setValues={setValues}
                handleAddVideo={handleAddVideo}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemove={handleVideoRemove}
              />
            </Modal>
            <div className='row pb-5'>
              <div className='col lesson-list'>
                <h4>
                  {collection && collection.videos && collection.videos.length}{" "}
                  videos
                </h4>
                <List
                  itemLayout='horizontal'
                  dataSource={collection && collection.videos}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></Item.Meta>
                    </Item>
                  )}
                ></List>
              </div>
            </div>
          </div>
        )}
      </div>
    </CreatorRoute>
  );
};

export default CourseView;