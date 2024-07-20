import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../components/Text';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import Oauth from '../components/Oauth';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const [visible, setVisible] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className='flex'>
      <div className='flex-1 flex items-center justify-center max-w-lg p-4 hidden lg:inline pl-20'>
        <Text />
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <div className='p-3 mt-20 md:mt-20 w-full max-w-md md:max-w-lg mx-auto border rounded-xl shadow-md hover:scale-105 transition ease-linear duration-150'>
          <h1 className='text-3xl text-center font-semibold my-7 hover:underline'>Sign In</h1>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              className='border p-3 rounded-lg'
              id='email'
              onChange={handleChange}
            />
            <div className='relative'>
              <input
                type={visible ? 'text' : 'password'}
                placeholder='Password'
                className='border p-3 rounded-lg w-full pr-10'
                id='password'
                onChange={handleChange}
              />
              <div className=' scale-105 absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-900 cursor-pointer ' onClick={toggleVisibility}>
                {visible ? <MdOutlineRemoveRedEye /> : <IoEyeOffOutline />}
              </div>
            </div>
            <button
              disabled={loading}
              className='bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'
            >
              {loading ? 'Loading...' : 'Sign in'}
            </button>
            <Oauth />
          </form>
          <div className='flex gap-2 mt-5'>
            <p>Not Having An Account Already?</p>
            <Link to={"/signup"}>
              <span className='text-blue-700 hover:text-blue-800 hover:underline'>Sign-up</span>
            </Link>
          </div>
          {error && <p className='text-red-600 text-left mt-5 text-sm font-normal'>{error + ' !'}</p>}
        </div>
      </div>
    </div>
  );
}
