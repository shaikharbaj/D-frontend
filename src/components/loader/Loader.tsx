/* eslint-disable @next/next/no-img-element */
import React from "react";

interface ILoaderProps {
  show: boolean;
}

const Loader: React.FunctionComponent<ILoaderProps> = ({ show }) => {
  return (
    <>
      <div
        className={`h-screen w-screen fixed left-0 top-0 flex items-center justify-center bg-white/10 backdrop-blur-sm z-50 ${
          show === false && "hidden"
        }`}
      >
        <div className="flex">
          <div className="relative">
            <div className="w-12 h-12 rounded-full absolute border-8 border-dashed border-gray-200 dark:border-gray-600"></div>

            <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-dashed border-[#de175b] dark:border-white border-t-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
