"use client";
/* eslint-disable @next/next/no-img-element */
import "./style.modules.scss";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IBreadcrumbProps {
  breadcrumbData?: any;
  action?: () => void;
}

const Breadcrumb: React.FunctionComponent<IBreadcrumbProps> = ({
  breadcrumbData,
  action,
}) => {
  return (
    <div className="flex flex-row justify-between items-center py-6 px-3 bg-slate-300 dark:bg-gray-700 dark:text-gray-100 ">
      <div className="">
        <h1 className="text-[#102030] dark:text-white font-bold mb-1">
          {breadcrumbData?.title}
        </h1>
        <ul className="flex justify-start items-center text-xs">
          <li>
            <Link href="/dashboard" className=" text-gray-500 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-[#102030]"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </Link>
          </li>
          {breadcrumbData?.childrens?.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-3 h-3 mx-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>

              <li>
                {item?.is_link ? (
                  <Link
                    href={`${item.link}`}
                    className="text-[#102030] dark:text-white"
                  >
                    {item.labelName}
                  </Link>
                ) : (
                  <span className="text-gray-500 dark:text-white">
                    {item.labelName}
                  </span>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
      {breadcrumbData?.hasButton && (
        <Button onClick={action}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 inline-block mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {breadcrumbData?.buttonLabel}
        </Button>
      )}
    </div>
  );
};

export default Breadcrumb;
