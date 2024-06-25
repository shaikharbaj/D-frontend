/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import "./style.modules.scss";
import React from "react";

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = ({
}) => {

  return (
    <div className="z-40 w-full fixed left-0 bottom-0 mt-0 py-3 px-4 bg-white dark:bg-black dark:text-white shadow-sm text-right">
      <p className="text-xs">© 2023, Crafted with <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 text-red-500 inline-block">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg> by <span className=" text-pink-500 font-bold">VN</span></p>
    </div>
  );
};

export default Footer;
