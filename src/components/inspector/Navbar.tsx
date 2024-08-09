import images from "@/constants/images";
import React from "react";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-[80%] mx-auto py-3 bg-white flex items-center justify-between">
        <Image
          src={images.Logo}
          alt="logo"
          width={800}
          height={500}
          className="h-8 w-auto"
        />
        <ul className="flex items-center gap-12 font-bold font-roboto">
          <li className="hover:underline underline-offset-4 cursor-pointer">
            Dashboard
          </li>
          <li className="hover:underline underline-offset-4 cursor-pointer">
            Reports
          </li>
          <li className="hover:underline underline-offset-4 cursor-pointer">
            Settings
          </li>
        </ul>
      </div>
      <div className="w-full h-4 bg-main"></div>
    </div>
  );
};

export default Navbar;
