import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';

const Register = () => {
  // Create states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle the submitting of data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/register`,
        {
          name,
          email,
          password,
        }
      );
      toast.success('Registeration Completed! Please Login');
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='text-center p-5 mb-4 rounded-jumbo'>Register</h1>
      <div className='container col-md-4 offset-md-4 pb-5 form-register'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control mb-4 p-3 form-register-input shadow-none'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
            required
          />
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
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
