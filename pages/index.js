import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  UserAddOutlined,
  UploadOutlined,
  ShareAltOutlined,
  MoneyCollectOutlined,
  BankOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import CollectionCard from "../components/cards/CollectionCard";

const Index = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const { data } = await axios.get("/api/collections");
      setCollections(data);
    };
    fetchCollections();
  }, []);

  return (
    <>
      <section id='home'>
        <div className='p-5 mb-4 mt-0 rounded-jumbo'>
          <div className='row align-items-center h-100'>
            <div className='col-lg-6 mx-auto'>
              <h1 className='text-white pb-1 text-uppercase'>
                Share a Premium Video
              </h1>
              <h4 className='pb-4 text-white'>
                A premium content sharing website for content producers.
              </h4>
              <h5 className='pb-2 text-white'>
                Learn more about how you can offer premium videos to your
                subscribers and earn money each month by offering your premium
                content to the world.
              </h5>
              <button className='btn light-btn'>
                <Link href='/register'>
                  <a>Sign Up. It's Free.</a>
                </Link>
              </button>
            </div>
            <div className='col-lg-6'>
              <img
                src='https://cdn.pixabay.com/photo/2017/07/23/04/41/guitarist-2530542_960_720.jpg'
                className='hero-img mt-4'
              />
            </div>
          </div>
        </div>
      </section>
      <section id='about'>
        <div className='container px-1 py-5' id='featured-3'>
          <h1 className='pb-2 text-center'>How It Works</h1>
          <div className='row g-4 py-5 row-cols-1 row-cols-lg-4 justify-content-center'>
            <div className='feature col'>
              <div className='feature-icon secondary-bg bg-gradient'>
                <UserAddOutlined />
              </div>
              <h3>Sign Up.</h3>
              <p>
                Signing up for an account is user simple. Just head over to the
                register section and enter some basic information to sign up for
                an account. It's totally free!
              </p>
            </div>
            <div className='feature col'>
              <div className='feature-icon secondary-bg bg-gradient'>
                <UploadOutlined />
              </div>
              <h3>Upload.</h3>
              <p>
                Share your best and most premium videos with your fans. Have the
                ability to create a community of subscribers that are willing to
                pay for your craft.
              </p>
            </div>
            <div className='feature col'>
              <div className='feature-icon secondary-bg bg-gradient'>
                <ShareAltOutlined />
              </div>
              <h3>Share.</h3>
              <p>
                Get access to a private page for each of your categires of
                videos. Share the links with anyone you want and have them
                subscribe to your video list.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id='collections'>
        <div className='container px-1 py-5'>
          <h1 className='pb-2 text-center'>Recent Collections</h1>
          <div className='row'>
            {collections.map((collection) => (
              <div key={collection._id} className='col-md-4'>
                <CollectionCard collection={collection} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id='pricing'>
        <div className='container py-5'>
          <h1 className='pb-5 text-center'>Pricing</h1>
          <div className='p-5 mb-4  rounded-3 secondary-bg text-light'>
            <h1 className='display-5 fw-bold text-light'>Free. Forever.</h1>
            <p className='col-md-8 fs-4'>
              Our platform is 100% free to sign up and use. Only pay a small
              percentage of your sales every moneth. Use forever!
            </p>
            <button className='btn main-btn' type='button'>
              <Link href='/register'>
                <a>Register</a>
              </Link>
            </button>
          </div>
        </div>
      </section>
      <section id='footer' className='mt-5'>
        <footer className='text-center text-lg-start bg-light text-muted'>
          <section className='d-flex justify-content-center justify-content-lg-between p-4'>
            <div>
              <a href='' className='me-4 text-reset'>
                <i className='fab fa-facebook-f'></i>
              </a>
              <a href='' className='me-4 text-reset'>
                <i className='fab fa-twitter'></i>
              </a>
              <a href='' className='me-4 text-reset'>
                <i className='fab fa-google'></i>
              </a>
              <a href='' className='me-4 text-reset'>
                <i className='fab fa-instagram'></i>
              </a>
              <a href='' className='me-4 text-reset'>
                <i className='fab fa-linkedin'></i>
              </a>
              <a href='' className='me-4 text-reset'>
                <i className='fab fa-github'></i>
              </a>
            </div>
          </section>
          <section>
            <div className='container text-center text-md-start'>
              <div className='row'>
                <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>
                    <i className='fas fa-gem'></i>ShareAPremy
                  </h6>
                  <p>
                    Premium video sharing website. Create your video collections
                    and share them while you earn.
                  </p>
                </div>
                <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                      Video Sharing
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Account Management
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Stripe Integration
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Commission
                    </a>
                  </p>
                </div>
                <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                      Privacy Policy
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Refund Policy
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'></a>
                  </p>
                </div>
                <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                  <p>
                    <i className='fas fa-home me-3'></i> New York, NY 10012, US
                  </p>
                  <p>
                    <i className='fas fa-envelope me-3'></i>
                    info@example.com
                  </p>
                  <p>
                    <i className='fas fa-phone me-3'></i> + 01 234 567 88
                  </p>
                  <p>
                    <i className='fas fa-print me-3'></i> + 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className='text-center p-4 text-dark'>
            © 2022 Copyright Shareapremy
          </div>
        </footer>
      </section>
    </>
  );
};

export default Index;
