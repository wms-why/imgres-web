import React from 'react';

const Hero = () => {
  return (
    <section className="w-full pb-16">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Resize Your Image
            <br />
            <span className="text-gray-400">
              With Precision
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional image resizing tool that maintains quality while reducing file size.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
