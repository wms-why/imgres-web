'use client';

import React from 'react';
import { loginStore } from '@/store/LoginStore';
import { logout } from '../api/login';

const LoginButton = () => {


  const { setShowLoginPanel, userInfo, setUserInfo } = loginStore();
  const handleLoginClick = () => {
    setShowLoginPanel(true);
  };

  const handleLogout = () => {
    logout(setUserInfo);
  };

  return (
    <>
      {userInfo ? (
        <div className="flex items-center space-x-4   pl-4 pr-2 py-1">
          <div className="flex items-center space-x-2">
            {
              userInfo?.picture ? (
                <img src={userInfo?.picture} alt="User Avatar" className="w-10 h-10 rounded-full cursor-pointer" title={userInfo?.username} />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-100 font-medium">{userInfo?.username}</span>
                </>
              )
            }

            <span className="text-gray-300">credits: {userInfo?.credits}</span>

          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-gray-300 hover:text-red-400 hover:bg-gray-700/50 px-3 py-1.5 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={handleLoginClick}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};

export default LoginButton;
