import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white text-lg font-medium mb-4">ImageResize</h3>
            <p className="text-sm">
              Professional image resizing tool for all your needs.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#features" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-medium mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} ImageResize. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
