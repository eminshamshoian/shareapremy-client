import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/Routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import collection from "../../../shareapremy-server/models/collection";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadlCollections();
  }, []);

  const loadlCollections = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-collections");
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className='d-flex justify-content-center display-1 text-danger p-5'
        />
      )}
      <h1 className='text-center p-5 mb-4 '>User Dashboard</h1>

      {/* show list of collections */}

      {collections &&
        collections.map((collection) => (
          <div key={collection._id} className='media pt-2 pb-1'>
            <Avatar
              size={80}
              shape='square'
              src={
                collection.image ? collection.image.Location : "/collection.png"
              }
            />

            <div className='media-body pl-2'>
              <div className='row'>
                <div className='col'>
                  <Link
                    href={`/user/collection/${collection.slug}`}
                    className='pointer'
                  >
                    <a>
                      <h5 className='mt-2 text-primary'>{collection.name}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: "-10px" }}>
                    {collection.videos.length} videos
                  </p>
                  <p
                    className='text-muted'
                    style={{ marginTop: "-15px", fontSize: "12px" }}
                  >
                    By {collection.creator.name}
                  </p>
                </div>
                <div className='col-md-3 mt-3 text-center'>
                  <Link href={`/user/collection/${collection.slug}`}>
                    <a>
                      <PlayCircleOutlined className='h2 pointer text-primary' />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </UserRoute>
  );
};

export default UserIndex;
