import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/Routes/UserRoute";

const BecomeCreator = () => {
  // State
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeCreator = () => {
    // console.log("become instructor");
    setLoading(true);
    axios
      .post("/api/make-creator")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <h1 className='text-center p-5 mb-4 '>Become A Creator</h1>
      <div className='container col-md-4 offset-md-4 pb-5 form-payout'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 text-center'>
            <div className='pt-4'>
              <UserSwitchOutlined className='display-1 pb-3 main-color' />
              <br />
              <h1>Setup Payment Management</h1>
              <Button
                className='mb-3 long-btn'
                type='primary'
                block
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size='large'
                onClick={becomeCreator}
                disabled={
                  (user && user.role && user.role.includes("Creator")) ||
                  loading
                }
              >
                {loading ? "Processing..." : "Payout Setup"}
              </Button>

              <p className='main-color'>
                You will be redirected to stripe to complete onboarding process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeCreator;
