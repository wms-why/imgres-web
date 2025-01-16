import React from 'react';
import LoginButton from './LoginButton';

const Header = () => {

  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
      <nav className="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            }>
              <a className="text-white text-2xl font-medium" href="/">Imgres</a>
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#tool" className="text-gray-300 hover:text-white transition-colors">Tool</a>
            <a href="/#price" className="text-gray-300 hover:text-white transition-colors">Price</a>
            <a href="/#EffectComparison" className="text-gray-300 hover:text-white transition-colors">Effect Comparison</a>
            <a href="/#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {/* <LoginButton /> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
