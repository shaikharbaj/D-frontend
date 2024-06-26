/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";

interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = ({}) => {
  const [open, setOpen] = React.useState(true);
  const [submenuopen1, setsubmenuOpen1] = React.useState(false);
  const [submenuopen2, setsubmenuOpen2] = React.useState(false);
  const [loanMenu, setLoanMenu] = React.useState(false);

  return (
    // <div className={`w-72 h-screen fixed top-0 left-0 ${styles.bg_dark}`}>
    <div
      className={`z-50 w-72 h-full fixed top-0 duration-300 ease-in-out transition-all bg-[#102030] dark:bg-[#102030] ${
        open ? "left-0" : "-left-72"
      }`}
    >
      <div className=" h-auto">
        <div className="px-6 pt-5">
          <div className="flex items-center justify-between">
            <a className="flex items-center justify-center" href="#">
              <img className="w-10" src="/img/fav-icon.png" alt="Logo" />
            </a>
            <button
              className={`flex relative items-center justify-center p-1.5 rounded bg-gray-800 text-white duration-300 ease-in-out transition-all ${
                open ? "" : "-right-20 -top-2 p-3"
              } `}
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className={`w-5 h-5 bi bi-list duration-300 ease-in-out transition-all ${
                  !open && "rotate-90"
                }`}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Main Menu */}
      <div className="h-4/6 overflow-x-auto">
        <div className="px-6 pt-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-4 h-4 bi bi-search text-gray-500"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
            <input
              className="w-full rounded pl-8 px-4 py-2.5 ps-10 text-sm font-light bg-gray-800 text-white placeholder-gray-500"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="px-6 pt-4">
          <hr className="border-gray-700" />
        </div>
        <div className="px-6 pt-4">
          <ul className="flex flex-col space-y-2">
            <li className="">
              <Link
                href="/admin/dashboard"
                className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-4 h-4 bi bi-ui-checks-grid mr-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li className="">
              <Link
                href="/admin/doctypes"
                className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-4 h-4 bi bi-ui-checks-grid mr-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z" />
                </svg>
                Doctypes
              </Link>
            </li>
            <li className="">
              <Link
                href="/admin/users"
                className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-4 h-4 bi bi-ui-checks-grid mr-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z" />
                </svg>
                Users
              </Link>
            </li>
            <li className="">
              <Link
                href="/demo/multi_section"
                className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-4 h-4 bi bi-ui-checks-grid mr-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z" />
                </svg>
                Demo multi-section
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* User Profile */}
      <div className="h-1/6">
        <div className=" absolute bottom-0 left-0 pl-6 pr-4 py-4 bg-gray-900 flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white">
              <img
                className="rounded-full"
                src="/img/userProfile.png"
                alt="User Profile"
              />
            </div>
            <div className="flex flex-col pl-3">
              <div className="text-sm text-gray-50">Vishnu Nimbalkar</div>
              <span className="text-xs text-[#acacb0] font-light tracking-tight">
                vnimbalkar@gmail.com
              </span>
            </div>
          </div>
          <button className="text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white">
            <svg
              className="w-4 h-4 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.25 10.75L12 14.25L8.75 10.75"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
