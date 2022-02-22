import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  // state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // context
  const {
    state: { user },
  } = useContext(Context);
  // router
  const router = useRouter();

  // redirect if user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email for the secret code");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
      toast.success("Password has been updated!");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <h1 className='text-center p-5 mb-4 rounded-jumbo'>Reset Password</h1>
      <div
        className='container col-md-4 offset-md-4 pb-5 form-register'
        style={{ height: "25rem" }}
      >
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type='email'
            className='form-control mb-4 p-3 form-register-input shadow-none'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your existing email'
            required
          />
          {success && (
            <>
              <input
                type='text'
                className='form-control mb-4 p-3 form-register-input shadow-none'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder='Enter secret code'
                required
              />
              <input
                type='password'
                className='form-control mb-4 p-3 form-register-input shadow-none'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter new password'
                required
              />
            </>
          )}
          <button
            type='submit'
            className='btn main-btn p-2'
            disabled={loading || !email}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
