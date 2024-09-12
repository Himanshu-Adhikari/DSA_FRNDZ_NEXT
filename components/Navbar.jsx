// components/Navbar.jsx
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-zinc-800 text-yellow-300 shadow-md  ">
      <div className="container mx-auto flex justify-between items-center p-4 ">
        <div className="text-lg font-semibold">
          <a
            href="/"
           className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 text-transparent bg-clip-text transition-colors duration-300 ease-in-out hover:bg-gradient-to-l hover:from-yellow-500 hover:via-yellow-400 hover:to-orange-500"
          >
            DSA_FRNDZ
          </a>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-yellow-400 transition-colors">Home</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">About</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Services</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
        </div>
        <button className="md:hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-zinc-800 p-4`}>
        <a href="#" className="block py-2 text-yellow-300 hover:text-yellow-400 transition-colors">Home</a>
        <a href="#" className="block py-2 text-yellow-300 hover:text-yellow-400 transition-colors">About</a>
        <a href="#" className="block py-2 text-yellow-300 hover:text-yellow-400 transition-colors">Services</a>
        <a href="#" className="block py-2 text-yellow-300 hover:text-yellow-400 transition-colors">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
