'use client';

import React, { use, useEffect } from 'react';
import { UseBoundStore, StoreApi } from 'zustand';
import { Store } from '../Context';
import { decodeFromCache } from './LoginPanel';

const LoginButton = ({ useStore }: {
  useStore: UseBoundStore<StoreApi<Store>>
}) => {


  const setShowLoginPanel = useStore((state) => state.setShowLoginPanel);
  const isLogin = useStore((state) => state.isLogin);
  const setIsLogin = useStore((state) => state.setIsLogin);
  const setUsername = useStore((state) => state.setUsername);
  const username = useStore((state) => state.username);

  useEffect(() => {
    const username = decodeFromCache();

    if (username) {
      setIsLogin(true);
      setUsername(username);
      setShowLoginPanel(false);
    }
  }, [])

  const handleLoginClick = () => {
    setShowLoginPanel(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
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
