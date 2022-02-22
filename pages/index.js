import Link from "next/link";
import {
  UserAddOutlined,
  UploadOutlined,
  ShareAltOutlined,
  MoneyCollectOutlined,
  BankOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const Index = () => {
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
          <div className='row g-4 py-5 row-cols-1 row-cols-lg-3'>
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
            <div className='feature col'>
              <div className='feature-icon secondary-bg bg-gradient'>
                <MoneyCollectOutlined />
              </div>
              <h3>Earn.</h3>
              <p>
                Earn money as you go. When your fans sign up for one of your
                channels, you get to charge them a fee. Keep 80% of what you
                earn and pay the rest to keep the platform going.
              </p>
            </div>
            <div className='feature col'>
              <div className='feature-icon secondary-bg bg-gradient'>
                <BankOutlined />
              </div>
              <h3>Direct Deposit.</h3>
              <p>
                Recieve direct deposits by setting up and onboarding with our
                payment processors. Payments will be disbursed every week to the
                account of your choosing.
              </p>
            </div>
            <div className='feature col'>
              <div className='feature-icon secondary-bg bg-gradient'>
                <RiseOutlined />
              </div>
              <h3>Grow.</h3>
              <p>
                Most importantly, grow as a creator. Have the ability to scale
                your art to a profitable business and not just another video on
                the web.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id='pricing'>
        <div class='container py-5'>
          <h1 className='pb-5 text-center'>Pricing</h1>
          <div class='p-5 mb-4  rounded-3 secondary-bg text-light'>
            <h1 class='display-5 fw-bold text-light'>Free. Forever.</h1>
            <p class='col-md-8 fs-4'>
              Our platform is 100% free to sign up and use. Only pay a small
              percentage of your sales every moneth. Use forever!
            </p>
            <button class='btn main-btn' type='button'>
              <Link href='/register'>
                <a>Register</a>
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
