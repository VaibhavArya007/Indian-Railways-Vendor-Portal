import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { GrGoogle } from "react-icons/gr";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Oauth() {
    const dispatch = useDispatch();
 
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);

            const result=await signInWithPopup(auth, provider);
            
            const req=await fetch('api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo:result.user.photoURL})
            }); 
               
            const data=await req.json(); 
            console.log(data); 
            dispatch (signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log("Couldn't connect with Google", error);
        }
}
  return (
    <button type="button" onClick={handleGoogleClick}className='bg-emerald-700 items-center hover:opacity-90 rounded-lg justify-center text-white p-3 flex'>
      Connect with Google <GrGoogle className='ml-2' />
    </button>
  )
}
