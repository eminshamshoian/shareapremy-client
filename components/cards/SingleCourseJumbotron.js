import SingleCollection from "../../pages/collection/[slug]";
import { currencyFormatter } from "../../utils/helpers";
import { Badge, Modal, Button } from "antd";
import ReactPlayer from "react-player";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";

const SingleCourseJumbotron = ({
  collection,
  showModal,
  setShowModal,
  preview,
  setPreview,
  loading,
  user,
  handlePaidSub,
  handleFreeSub,
  enrolled,
  setEnrolled,
}) => {
  // destructure
  const {
    name,
    description,
    creator,
    updatedAt,
    videos,
    image,
    price,
    paid,
    category,
  } = collection;

  return (
    <div className='jumbotron bg-primary square'>
      <div className='row'>
        <div className='col-md-8'>
          {/* title */}
          <h1 className='text-light font-weight-bold'>{name}</h1>
          {/* description */}
          <p className='lead'>
            {description && description.substring(0, 160)}...
          </p>
          {/* category */}
          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className='pb-4 mr-2'
          />
          {/* author */}
          <p>Created by {creator.name}</p>
          {/* updated at */}
          <p>Last udpated {new Date(updatedAt).toLocaleDateString()}</p>
          {/* price */}
          <h4 className='text-light'>
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
        </div>
        <div className='col-md-4'>
          {/* {JSON.stringify(videos[0])} */}
          {/* show video preview or collection image */}
          {videos[0].video && videos[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(videos[0].video.Location);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className='react-player-div'
                url={videos[0].video.Location}
                light={image.Location}
                width='100%'
                height='225px'
              />
            </div>
          ) : (
            <>
              <img src={image.Location} alt={name} className='img img-fluid' />
            </>
          )}
          {/* enroll button */}
          {loading ? (
            <div className='d-flex justify-content-center mt-3'>
              <LoadingOutlined className='h1 text-danger' />
            </div>
          ) : (
            <Button
              className='mb-3 mt-3'
              type='danger'
              block
              shape='round'
              icon={<SafetyOutlined />}
              size='large'
              disabled={loading}
              onClick={paid ? handlePaidSub : handleFreeSub}
            >
              {user
                ? enrolled.status
                  ? "Go to collection"
                  : "Enroll"
                : "Login to enroll"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseJumbotron;
