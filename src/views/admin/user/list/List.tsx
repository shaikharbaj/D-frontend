"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Breadcrumb, Card, Loader, Section } from "@/components";
import { ComponentHOC } from "@/HOC";

interface IListProps {}

const List: React.FunctionComponent<IListProps> = () => {
  const breadcrumbData = {
    title: "Users",
    hasButton: true,
    buttonLabel: "Add User",
    childrens: [
      {
        labelName: "Dashboard",
        is_link: true,
        link: "/admin/dashboard",
      },
      {
        labelName: "Users",
        is_link: false,
      },
    ],
  };
  const PAGECODE = "user_list";
  const API_URL = `http://localhost:5000/users`;
  const router = useRouter();
  const [isPageInitialized, setIsPageInitialized] = React.useState(false);
  const [pageConfiguration, setPageConfiguration] = React.useState({});
  const [pageSections, setPageSections] = React.useState([]);

  //useEffect to load page configuration
  React.useEffect(() => {
    init();

    return () => {
      //cleanup
    };
  }, []);

  //function to init page
  const init = () => {
    console.log("Initializing page");
    setIsPageInitialized(false);
    axios
      .get(`http://localhost:5000/pages?code=${PAGECODE}`)
      .then((response) => {
        const data = response?.data;
        if (data && data.length > 0) {
          setPageConfiguration(data[0]);
          if (data[0]?.has_sections === true) {
            initSections(data[0]?.id);
          }
        }
      });
  };

  //function to init sections
  const initSections = (pageId: string) => {
    console.log("Initializing page sections");
    axios
      .get(`http://localhost:5000/sections?pageId=${pageId}`)
      .then((response) => {
        const sections = response?.data;
        setPageSections(sections);
        setIsPageInitialized(true);
      });
  };

  //Function to navigate to add user page
  const handelAddAction = () => {
    router.push(`/admin/users/add`);
  };

  //Function to navigate to edit user page
  const handelEditAction = (userId: any) => {
    router.push(`/admin/users/edit/${userId}`);
  };

  //Function to delete selected user
  const handelDeleteAction = (userId: any) => {
    axios.delete(`${API_URL}/${userId}`).then((response) => {
      console.log("delete user response ", response);
    });
  };

  //Function to handel action
  const handelAction = (action: any, data: any) => {
    if (action?.code === "update") {
      return handelEditAction(data?.id);
    } else if (action?.code === "delete") {
      return handelDeleteAction(data?.id);
    }
  };

  return (
    <>
      <Loader show={isPageInitialized === true ? false : true} />
      <Breadcrumb breadcrumbData={breadcrumbData} action={handelAddAction} />
      <Section>
        <ComponentHOC
          componentConfig={pageSections}
          handelTableAction={handelAction}
        />
      </Section>
    </>
  );
};

export default List;
