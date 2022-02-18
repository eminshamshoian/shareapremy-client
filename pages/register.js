import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import { Context } from '../context';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Register = () => {
  // Create states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Global state
  const {
    state: { user },
  } = useContext(Context);

  // Create router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push('/');
  }, [user]);

  // Function to handle the submitting of data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
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
      <div
        className='container col-md-4 offset-md-4 pb-5 form-register'
        style={{ height: '25rem' }}
      >
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
        <p className='text-center p-3 text-dark'>
          Already registered?{' '}
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
