import React from 'react';

export default function Bottom() {
  return (
    <div className='w-full fixed bottom-0 bg-sky-200 shadow-inner opacity-60 text-center h-5 flex items-center'>
      <div className='text-xs text-gray-900 pt-1 w-full'>
        Disclaimer: This website is created for educational purposes only 
        <span className='hidden lg:inline'> | 
        Copyright © 2024 All rights reserved | This website was created by - Vaibhav Arya
        </span>
      </div>
    </div>
  );
}
