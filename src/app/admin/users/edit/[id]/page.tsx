import React from "react";
import { Edit } from "@/views/admin";

interface IPageProps {
  params: {
    id: number;
  };
}

const Page: React.FunctionComponent<IPageProps> = async ({params}) => {
  return <Edit id={params.id} />;
};

export default Page;
