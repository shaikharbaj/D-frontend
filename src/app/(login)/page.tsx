import React from "react";
import Login from "@/views/admin/login/Login";

interface IPageProps {
}

const Page: React.FunctionComponent<IPageProps> = async (props) => {
  return (
    <Login />
  )
};

export default Page;