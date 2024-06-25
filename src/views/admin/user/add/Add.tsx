"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Breadcrumb, Section, Loader } from "@/components";
import { ComponentHOC } from "@/HOC";

interface IAddProps {}

const Add: React.FunctionComponent<IAddProps> = () => {
  const breadcrumbData = {
    title: "Users",
    hasButton: false,
    childrens: [
      {
        labelName: "Dashboard",
        is_link: true,
        link: "/admin/dashboard",
      },
      {
        labelName: "Users",
        is_link: true,
        link: "/admin/users",
      },
      {
        labelName: "Add User",
        is_link: false,
      },
    ],
  };
  const PAGECODE = "user_add";
  const router = useRouter();
  const [isPageInitialized, setIsPageInitialized] = React.useState(false);
  const [pageConfiguration, setPageConfiguration] = React.useState({});
  const [pageSections, setPageSections] = React.useState([]);
  const [formData, setFormData] = React.useState<any>({});
  const [formErrors, setFormErrors] = React.useState<any>({});

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
        if (sections && sections.length > 0) {
          generateFormData(sections);
        }
      });
  };

  //function to generate form data
  const generateFormData = (sectionArr: any) => {
    let formDataObj: any = {};
    let formErrorObj: any = {};
    sectionArr.forEach((section: any, _sectionIndex: number) => {
      formDataObj[section?.code] = {};
      formErrorObj[section?.code] = {};
      if (section.fields.length > 0) {
        section.fields.forEach((field: any, _fieldIndex: number) => {
          formDataObj[section?.code][field?.code] = "";
          formErrorObj[section?.code][field?.code] = null;
        });
      }
    });
    setFormData(formDataObj);
    setFormErrors(formErrorObj);
    setPageSections(sectionArr);
    setIsPageInitialized(true);
  };

  //Function to handel input change
  const handelChange = (section: string, field: string, event: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: event.target.value,
      },
    }));

    setFormErrors((prevState: any) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: null,
      },
    }));
  };

  //Functiion to validate form data
  const validate = (data: any, sectionObj: string) => {
    let flag = true;
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] === "" || data[key] === null) {
          flag = false;
          setFormErrors((prevState: any) => ({
            ...prevState,
            [sectionObj]: {
              ...prevState[sectionObj],
              [key]: `${key.replaceAll("_", " ")} is required.`,
            },
          }));
        }
      }
    }
    return flag;
  };

  //Function to handel button click
  const handelButtonClick = (buttonObj: any) => {
    if (buttonObj.code === "save_btn") {
      const submittedData = formData[buttonObj.binding];
      const validationResponse = validate(submittedData, buttonObj.binding);
      if (validationResponse) {
        processFormSubmit(buttonObj.binding, submittedData);
      }
    } else if (buttonObj.code === "back_btn") {
    } else {
      console.log("In Else");
    }
  };

  //Function to refresh particular section data
  const refreshSectionData = (obj: any) => {
    let refreshedObj: any = {};
    for (let key in obj) {
      refreshedObj[key] = "";
    }
    return refreshedObj;
  };

  //Function to process form submit
  const processFormSubmit = (section: string, data: any) => {
    axios.post("http://localhost:5000/users", data).then(() => {
      alert("Data submitted successfully.");
      setFormData((prevState: any) => ({
        ...prevState,
        [section]: refreshSectionData(data),
      }));
      router.push(`/admin/users`);
    });
  };

  return (
    <>
      <Loader show={isPageInitialized === true ? false : true} />
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <Section>
        <ComponentHOC
          componentConfig={pageSections}
          dataBinding={formData}
          errorBinding={formErrors}
          handelChange={handelChange}
          handelButtonClick={handelButtonClick}
        />
      </Section>
    </>
  );
};

export default Add;
