'use client';

import React, { useEffect } from 'react';
import { loadFromCache } from './LoginPanel';
import { loginStore } from '@/store/LoginStore';

const LoginButton = () => {


  const setShowLoginPanel = loginStore((state) => state.setShowLoginPanel);
  const isLogin = loginStore((state) => state.isLogin);
  const setUsername = loginStore((state) => state.setUsername);
  const username = loginStore((state) => state.username);
  const setToken = loginStore((state) => state.setToken);

  useEffect(() => {
    const loadResult = loadFromCache();

    if (loadResult) {
      setUsername(loadResult.username);
      setToken(loadResult.token);
      setShowLoginPanel(false);
    }
  }, [])

  const handleLoginClick = () => {
    setShowLoginPanel(true);
  };

  const handleLogout = () => {
    setUsername("");
  };

  return (
    <>
      {isLogin ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">{username}</span>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white transition-colors"
          >
            登出
          </button>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={handleLoginClick}
            className="text-gray-300 hover:text-white transition-colors"
          >
            登录
          </button>
        </div>
      )}
    </>
  );
};

export default LoginButton;
