import React from 'react';
import LoginButton from './LoginButton';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {

  const width = 512;
  const height = 512;
  const factor = 0.08;
  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
      <nav className="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <div onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            }
            >
              <Link href="/" className="flex items-center font-bold text-2xl text-white cursor-pointer gap-2">
                <Image src="/logo@512_512.png" width={width * factor} height={height * factor} alt='logo picture' />
                Imgres
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#tool" className="text-gray-300 hover:text-white transition-colors">Tool</a>
            <a href="/price" className="text-gray-300 hover:text-white transition-colors">Price</a>
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
