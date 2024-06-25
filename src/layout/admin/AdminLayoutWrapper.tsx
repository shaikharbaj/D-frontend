"use client"
import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
interface IAdminLayoutWrapperProps {
  children: React.ReactNode;
}

const AdminLayoutWrapper: React.FunctionComponent<IAdminLayoutWrapperProps> = ({ children }) => {

  return (
      <>
        <div className="relative min-h-screen md:pl-72 pt-16 pb-10 transition-all duration-500 ease-in-out bg-slate-100 dark:bg-gray-900">
            <Header/>
            <Sidebar />
                {children}
            <Footer />
        </div>
      </>
  );
};

export default AdminLayoutWrapper;
