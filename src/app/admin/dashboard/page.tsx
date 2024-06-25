
import React from "react";
import { Dashboard } from "@/views/admin";


interface IPageProps {
}

const Page: React.FunctionComponent<IPageProps> = async (props) => {
  return (
    <Dashboard />
  )
};

export default Page;
