"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Breadcrumb, Section, Loader, Card } from "@/components";
import { ComponentHOC } from "@/HOC";

interface IAddProps {}

const Add: React.FunctionComponent<IAddProps> = () => {
  const breadcrumbData = {
    title: "Doctypes",
    hasButton: false,
    childrens: [
      {
        labelName: "Dashboard",
        is_link: true,
        link: "/admin/dashboard",
      },
      {
        labelName: "Doctypes",
        is_link: true,
        link: "/admin/doctypes",
      },
      {
        labelName: "Add Doctype",
        is_link: false,
      },
    ],
  };
  const PAGECODE = "doctype_add";
  const router = useRouter();
  const [isPageInitialized, setIsPageInitialized] = React.useState(false);
  const [pageConfiguration, setPageConfiguration] = React.useState({});
  const [pageSections, setPageSections] = React.useState([]);
  const [formData, setFormData] = React.useState<any>({});
  const [formErrors, setFormErrors] = React.useState<any>({});

  //useEffect to load page configuration
  React.useEffect(() => {
    return () => {
      //cleanup
    };
  }, []);

  //Function to handel input change
  const handelChange = (section: string, field: string, event: any) => {};

  return (
    <>
      <Loader show={isPageInitialized === true ? false : true} />
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <Section>
        <Card heading="Add Doctype">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">

            </div>
        </Card>
      </Section>
    </>
  );
};

export default Add;
