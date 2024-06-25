"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Breadcrumb, Card, Loader, Section } from "@/components";
import { ComponentHOC } from "@/HOC";
import { DataTable } from "@/components/dataTable/DataTable";

interface IListProps {}

const List: React.FunctionComponent<IListProps> = () => {
  const breadcrumbData = {
    title: "Doctypes",
    hasButton: true,
    buttonLabel: "Add Doctype",
    childrens: [
      {
        labelName: "Dashboard",
        is_link: true,
        link: "/admin/doctype",
      },
      {
        labelName: "Doctypes",
        is_link: false,
      },
    ],
  };
  const PAGECODE = "doctype_list";
  const API_URL = `http://localhost:5000/doctypes`;
  const router = useRouter();
  const [isPageInitialized, setIsPageInitialized] = React.useState(true);

  //useEffect to load page configuration
  React.useEffect(() => {
    
    return () => {
      //cleanup
    };
  }, []);

  //Function to navigate to add doctype page
  const handelAddAction = () => {
    router.push(`/admin/doctypes/add`);
  };

  return (
    <>
      <Loader show={isPageInitialized === true ? false : true} />
      <Breadcrumb breadcrumbData={breadcrumbData} action={handelAddAction} />
      <Section>
        <Card heading={"Doctypes"}>
          <DataTable columns={[]} data={[]} />
        </Card>
      </Section>
    </>
  );
};

export default List;
