import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    const { data } = await axios.post(`http://localhost:8000/api/register`, {
      name,
      email,
      password,
    });
    console.log('REGISTER RESPONSE', data);
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
          <button type='submit' className='btn main-btn p-2'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
