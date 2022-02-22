const Index = () => {
  return (
    <>
      <div className='p-5 mb-4 mt-0 rounded-jumbo'>
        <div className='row align-items-center h-100'>
          <div className='col-lg-6 mx-auto'>
            <h1 className='text-white pb-4 text-uppercase'>
              Share a Premium Video
            </h1>
            <h5 className='text-white'>
              A premium content sharing website for content producers. Share
              your most premium videos with your fans today.
            </h5>
            <p className='pb-2'>
              Learn more about how you can offer premium videos to your
              subscribers.
            </p>
            <button className='btn light-btn'>Learn more</button>
          </div>
          <div className='col-lg-6'>
            <img
              src='https://cdn.pixabay.com/photo/2017/07/23/04/41/guitarist-2530542_960_720.jpg'
              className='hero-img mt-4'
            />
          </div>
        </div>
      </div>
      <p>from nextjs</p>
    </>
  );
};

export default Index;
