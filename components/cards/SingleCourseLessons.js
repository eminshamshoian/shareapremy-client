import { List, Avatar } from "antd";
const { Item } = List;

const SingleCourseLessons = ({
  videos,
  setPreview,
  showModal,
  setShowModal,
}) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col lesson-list'>
          {videos && <h4>{videos.length} videos</h4>}
          <hr />
          <List
            itemLayout='horizontal'
            dataSource={videos}
            renderItem={(item, index) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                />
                {item.video && item.video !== null && item.free_preview && (
                  <span
                    className='text-primary pointer'
                    onClick={() => {
                      setPreview(item.video.Location);
                      setShowModal(!showModal);
                    }}
                  >
                    Preview
                  </span>
                )}
              </Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseLessons;
