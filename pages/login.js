import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  // Create states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Global state
  const { state, dispatch } = useContext(Context);

  // Router
  const router = useRouter();

  // Function to handle the submitting of data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });

      // Dispatch the user login
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      // Save in localstorage
      window.localStorage.setItem("user", JSON.stringify(data));

      // Redirect
      router.push("/");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='text-center p-5 mb-4 rounded-jumbo'>Login</h1>
      <div className='container col-md-4 offset-md-4 pb-5 form-register'>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            className='form-control mb-4 p-3 form-register-input shadow-none'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
          />
          <input
            type='password'
            className='form-control mb-4 p-3 form-register-input shadow-none'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
          />
          <button
            type='submit'
            className='btn main-btn p-2'
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className='text-center p-3 text-dark'>
          Haven't Registered Yet?{" "}
          <Link href='/register'>
            <a>Register</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
