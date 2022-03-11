import { useState, useEffect } from "react";
import axios from "axios";
import CreatorRoute from "../../../../components/Routes/CreatorRoute";
import CollectionCreateForm from "../../../../components/forms/CollectionCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { List, Avatar, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateVideoForm from "../../../../components/forms/UpdateVideoForm";

const { Item } = List;

const CollectionEdit = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    videos: [],
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  // state for videos update
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("Upload Video");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCollection();
  }, [slug]);

  const loadCollection = async () => {
    const { data } = await axios.get(`/api/collection/${slug}`);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/collection/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/collection/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image upload failed. Try later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/collection/${slug}`, {
        ...values,
        image,
      });
      toast("Collection updated!");
    } catch (err) {
      toast(err.response.data);
    }
  };

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allVideos = values.videos;

    let movingItem = allVideos[movingItemIndex]; // clicked/dragged item to re-order
    allVideos.splice(movingItemIndex, 1); // remove 1 item from the given index
    allVideos.splice(targetItemIndex, 0, movingItem); // push item after target item index

    setValues({ ...values, videos: [...allVideos] });
    // save the new videos order in db
    const { data } = await axios.put(`/api/collection/${slug}`, {
      ...values,
      image,
    });
    // console.log("videos REARRANGED RES => ", data);
    toast.success("Videos rearranged successfully");
  };

  const handleDelete = async (index) => {
    const answer = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!answer) return;
    let allVideos = values.videos;
    const removed = allVideos.splice(index, 1);
    setValues({ ...values, videos: allVideos });
    // send request to server
    const { data } = await axios.put(
      `/api/collection/${slug}/${removed[0]._id}`
    );
  };

  /**
   * video update functions
   */

  const handleVideo = async (e) => {
    // remove previous
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `/api/collection/video-remove/${values.creator._id}`,
        current.video
      );
    }
    // upload
    const file = e.target.files[0];
    console.log(file);
    setUploadButtonText(file.name);
    setUploading(true);
    // send video as form data
    const videoData = new FormData();
    videoData.append("video", file);
    videoData.append("collectionId", values._id);
    // save progress bar and send video as form data to backend
    const { data } = await axios.post(
      `/api/collection/video-upload/${values.creator._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    );
    // once response is received
    console.log(data);
    setCurrent({ ...current, video: data });
    setUploading(false);
  };

  const handleUpdateVideo = async (e) => {
    // console.log("handle update video");
    e.preventDefault();
    const { data } = await axios.put(
      `/api/collection/video/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText("Upload Video");
    setVisible(false);
    // update ui
    if (data.ok) {
      let arr = values.videos;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, videos: arr });
      toast.success("video updated");
    }
  };

  return (
    <CreatorRoute>
      <h1 className='text-center p-5 mb-4'>Update collection</h1>
      {/* {JSON.stringify(values)} */}
      <div className='container col-md-4 offset-md-4 pb-5 form-collection'>
        <CollectionCreateForm
          handleSubmit={handleSubmit}
          handleImageRemove={handleImageRemove}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          editPage={true}
        />
        <div className='row pb-5'>
          <div className='col video-list'>
            <h4>{values && values.videos && values.videos.length} videos</h4>
            <List
              onDragOver={(e) => e.preventDefault()}
              itemLayout='horizontal'
              dataSource={values && values.videos}
              renderItem={(item, index) => (
                <Item
                  draggable
                  onDragStart={(e) => handleDrag(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <Item.Meta
                    onClick={() => {
                      setVisible(true);
                      setCurrent(item);
                    }}
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                  ></Item.Meta>
                  <DeleteOutlined
                    onClick={() => handleDelete(index)}
                    className='text-danger float-right'
                  />
                </Item>
              )}
            ></List>
          </div>
        </div>
      </div>
      <Modal
        title='Update Video'
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateVideoForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateVideo={handleUpdateVideo}
          uploadVideoButtonText={uploadVideoButtonText}
          progress={progress}
          uploading={uploading}
        />
      </Modal>
    </CreatorRoute>
  );
};

export default CollectionEdit;
