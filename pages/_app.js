import TopNav from '../components/TopNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import '../styles/home.css';
import '../styles/register.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position='top-right' />
      <TopNav />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
