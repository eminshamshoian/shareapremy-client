import { useState, useEffect } from "react";
import axios from "axios";
import CreatorRoute from "../../../../components/Routes/CreatorRoute";
import CollectionCreateForm from "../../../../components/forms/CollectionCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { List, Avatar } from "antd";

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
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

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
          <div className='col lesson-list'>
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
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                  ></Item.Meta>
                </Item>
              )}
            ></List>
          </div>
        </div>
      </div>
    </CreatorRoute>
  );
};

export default CollectionEdit;
