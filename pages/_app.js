import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import "../styles/home.css";
import "../styles/register.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import context api
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position='top-right' />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
