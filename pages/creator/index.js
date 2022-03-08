import { useState, useEffect } from 'react';
import axios from 'axios';
import CreatorRoute from '../../components/Routes/CreatorRoute';
import { Image, Button } from 'antd';
import Link from 'next/link';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileFilled,
} from '@ant-design/icons';

const CreatorIndex = () => {
  const [videos, setCollections] = useState([]);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    const { data } = await axios.get('/api/creator-collections');
    setCollections(data);
  };

  const myStyle = { fontSize: '25px', color: 'black' };

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
                    : '/collection.png'
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
                            fontSize: '22px',
                            textTransform: 'uppercase',
                          }}
                        >
                          {collection.name}
                        </h5>
                      </a>
                    </Link>
                    <p
                      style={{
                        color: '#fff',
                        border: 'solid 1px black',
                        width: '50%',
                        paddingLeft: '15px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        backgroundColor: '#1d0053',
                        borderRadius: '5px',
                      }}
                    >
                      {collection.videos.length} Videos in Collection
                    </p>
                    <hr className='mt-5' style={{ color: 'black' }} />
                    {collection.videos.length < 1 ? (
                      <p style={myStyle}>
                        <CloseCircleOutlined /> Upload a Video To Publish{' '}
                      </p>
                    ) : collection.published ? (
                      <p style={myStyle}>
                        Your collection is live in the marketplace
                      </p>
                    ) : (
                      <p style={myStyle}>
                        <CheckCircleOutlined /> Your collection is ready to be
                        published
                      </p>
                    )}
                  </div>

                  <div className=' text-left pointe pt-5'>
                    {collection.published ? (
                      <div>
                        <CheckCircleOutlined className='h5 collection-action-button' />
                        <h5>Publish Collection</h5>
                      </div>
                    ) : (
                      <Button
                        className='col-md-12 text-center long-btn'
                        type='primary'
                        shape='round'
                        icon={
                          <CloseCircleOutlined
                            className='h5 collection-action-button'
                            style={{ color: 'red', fontSize: '18px' }}
                          />
                        }
                        size='large'
                      >
                        Add A Video
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
