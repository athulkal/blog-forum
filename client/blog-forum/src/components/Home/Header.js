import React from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <header className="border-b-2 border-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-black text-2xl font-semibold">Blog-forum</h1>
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-2 h-6 w-6 cursor-pointer" />
          <input
            type="text"
            className="border-2 rounded-xl pl-10 py-2 pr-3"
            placeholder="Search..."
          />
        </div>
        <nav className="flex justify-between items-center p-4">
          <a
            href="#"
            className="flex text-black hover:text-blue-300 transition duration-300 mr-2"
          >
            <PencilSquareIcon className="h-8 w-8 mr-2" />
            <p className="text-black pr-2 pt-2">Write</p>
          </a>
          <div className="flex text-black hover:text-blue-300 transition duration-300">
            <UserCircleIcon className="h-8 w-8" />
            <ChevronDownIcon className="h-4 w-5 mt-2" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
