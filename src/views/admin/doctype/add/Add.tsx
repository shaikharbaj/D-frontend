"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";
import Draggable from "react-draggable";
import {
  Breadcrumb,
  Section,
  Loader,
  Card,
  Input,
  Select,
  DynamicCard,
  DynamicForm,
} from "@/components";
import { ComponentHOC } from "@/HOC";
import { Button } from "@/components/ui/button";

interface IAddProps {}

interface Field {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
  readOnly: boolean;
}

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
  const fieldTypeSelectorRef = React.useRef<HTMLSelectElement>(null);
  const [isPageInitialized, setIsPageInitialized] = React.useState(true);
  const [pageConfiguration, setPageConfiguration] = React.useState({});
  const [pageSections, setPageSections] = React.useState([]);
  const [formData, setFormData] = React.useState<any>({});
  const [formErrors, setFormErrors] = React.useState<any>({});
  const [page, setPage] = React.useState({ doctype_name: "", doctype_code: "", doctype_status: "" });
  const [section, setSection] = React.useState<any[]>([]);
  const [currentSection, setCurrentSection] = React.useState(0);
  const [currentField, setCurrentField] = React.useState(0);
  const [fieldConfiguration, setFieldConfiguration] = React.useState<any>({
    label: "",
    type: "",
    name: "",
    placeholder: "",
    length: "",
    options: "",
    defaultOption: "",
    isRequired: false,
    readOnly: false,
    hidden: false,
    inListView: false,
    inFilterList: false,
  });

  //useEffect to load page configuration
  React.useEffect(() => {
    initSection();
    return () => {
      //cleanup
    };
  }, []);

  //Use effect to handel current filed selection
  React.useEffect(() => {
    const currentSelectedSection = section[currentSection];
    const currentSelectedSectionFields = currentSelectedSection?.fields;
    if(currentSelectedSectionFields?.length > 0) {
      setFieldConfiguration(currentSelectedSectionFields[currentField]);
    }
  },[currentField]);

  //Function to init section 
  const initSection = () => {
    setSection([...section, {
      id: uuidv4(),
      section_name: "",
      type: "card",
      fields: [],
    }]);
  };

  //Function to handel change
  const handelChange = (parentSectionCode: any, fieldCode: any, e: any) => {
    setPage((prevField: any) => ({
      ...prevField,
      [fieldCode]: e.target.value,
    }));
  };

  //Function to handel section name chnage
  const handelSectionName = (sectionIndex: any, event: any) => {
    setSection((prevSection) => {
      return prevSection.map((sectionObj: any, sectionObjIndex: number) => {
        if (sectionObjIndex === currentSection) {
          return {
            ...sectionObj,
            section_name: event.target.value
          };
        }
        return section;
      });
    });
  };

  //Function to handel label change for the dynamic input
  const handelLabelChange = (fieldIndex: any, fieldConfig: any, event: any) => {
    setSection((prevSection) => {
      return prevSection.map((sectionObj: any, sectionObjIndex: number) => {
        if (sectionObjIndex === currentSection) {
          const newFields: any = [...sectionObj.fields];
          if (newFields[fieldIndex]) {
            newFields[fieldIndex].label = event.target.value;
          }
          return {
            ...sectionObj,
            fields: newFields
          };
        }
        return section;
      });
    });
  };

  //Function to refresh field type selector
  const refreshFieldTypeSelector = () => {
    if (fieldTypeSelectorRef.current) {
      fieldTypeSelectorRef.current.value = "";
    }
  };

  //Function to add new dynamic field
  const addField = () => {
    const fieldType = fieldTypeSelectorRef.current?.value;
    if (fieldType) {
      let currentObj = {
        id: uuidv4(),
        label: "",
        type: fieldType,
        name: "",
        placeholder: "",
        length: "",
        options: "",
        defaultOption: "",
        isRequired: false,
        readOnly: false,
        hidden: false,
        inListView: false,
        inFilterList: false,
      };
      setSection((prevSection) => {
        return prevSection.map((sectionObj: any, sectionObjIndex: number) => {
          if (sectionObjIndex === currentSection) {
            return {
              ...sectionObj,
              fields: [
                ...sectionObj.fields,
                currentObj
              ],
            };
          }
          return section;
        });
      });
      refreshFieldTypeSelector();
    } else {
      alert("Please select field type.");
    }
  };

  //Function to change current field
  const changeCurrentField = (currentIndex: number) => {
    setCurrentField(currentIndex);
  };

  //Function to handel confuguration change
  const handelFieldConfigurationChange = (
    parentSectionCode: any,
    fieldCode: any,
    e: any
  ) => {
    setFieldConfiguration((prevField: any) => ({
      ...prevField,
      [fieldCode]: e.target.value,
    }));

    setSection((prevSection) => {
      return prevSection.map((sectionObj: any, sectionObjIndex: number) => {
        if (sectionObjIndex === currentSection) {
          const newFields: any = [...sectionObj.fields];
          if (newFields[currentField]) {
            newFields[currentField][fieldCode] = e.target.value;
          }
          return {
            ...sectionObj,
            fields: newFields
          };
        }
        return section;
      });
    });
  };

  //Function to handel confuguration change
  const handelCheckboxChnage = (
    parentSectionCode: any,
    fieldCode: any,
    e: any
  ) => {
    setFieldConfiguration((prevField: any) => ({
      ...prevField,
      [fieldCode]: e.target.checked,
    }));

    setSection((prevSection) => {
      return prevSection.map((sectionObj: any, sectionObjIndex: number) => {
        if (sectionObjIndex === currentSection) {
          const newFields: any = [...sectionObj.fields];
          if (newFields[currentField]) {
            newFields[currentField][fieldCode] = e.target.checked;
          }
          return {
            ...sectionObj,
            fields: newFields
          };
        }
        return section;
      });
    });
  };

  //Function to handel doctypee submission
  const handelDoctypeSubmit = () => {
    const doctypePayload = {
      id: uuidv4(),
      doctype_name: page.doctype_name,
      doctype_code: page.doctype_code,
      doctype_status: page.doctype_status,
      sections: section
    };
    axios.post("http://localhost:5000/doctypes", doctypePayload).then(() => {
      alert("Data submitted successfully.");
      router.push(`/admin/doctypes`);
    });
  };

  return (
    <>
      <Loader show={isPageInitialized === true ? false : true} />
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <Section>
        <Card heading="Add Doctype">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
            <Input
              fieldParentSectionCode="doctype_name"
              fieldConfig={{
                displayName: "*Doctype Name",
                type: "text",
                placeholder: "Enter doctype name",
                name: "doctype_name",
                code: "doctype_name",
                _id: 1,
              }}
              value={page?.doctype_name}
              error=""
              handelChange={handelChange}
            />
            <Input
              fieldParentSectionCode="doctype_code"
              fieldConfig={{
                displayName: "*Doctype Code",
                type: "text",
                placeholder: "Enter doctype code",
                name: "doctype_code",
                code: "doctype_code",
                _id: 2,
              }}
              value={page?.doctype_code}
              error=""
              handelChange={handelChange}
            />
            <Select 
              fieldParentSectionCode="doctype_status"
              fieldConfig={{
                _id: 3,
                displayName: "*Doctype Status",
                placeholder: "Please select doctype status",
                name: "doctype_status",
                code: "doctype_status",
                options: [
                  {value: "inactive", label: "InActive"},
                  {value: "active", label: "Active"}
                ]
              }}
              value={page?.doctype_status}
              error=""
              handelChange={handelChange} />
          </div>
          <div className="mt-8 flex justify-between">
            <Button onClick={() => handelDoctypeSubmit()}>Save</Button>
          </div>
        </Card>
        <Card heading="Configure Doctype Fields">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
            <div className=" col-span-2">
              {
                section.map((sectionObj: any, sectionObjIndex: number) => {
                  return(
                    <DynamicCard key={sectionObjIndex} sectionIndex={sectionObjIndex} sectionConfig={sectionObj} handelSectionName={handelSectionName}>
                      <div className="mb-4">
                        <select
                          className="w-full text-sm border-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-3 mt-1 bg-transparent"
                          ref={fieldTypeSelectorRef}
                        >
                          <option value=""></option>
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="textarea">Textarea</option>
                          <option value="select">Select</option>
                          <option value="password">Password</option>
                          <option value="checkbox">Checkbox</option>
                          <option value="radio">Radio Button</option>
                          <option value="file">Attach</option>
                          <option value="file_image">Attach Image</option>
                          <option value="date">Date</option>
                          <option value="datetime-local">Datetime</option>
                        </select>
                      </div>
                      <div className="flex justify-between">
                        <Button onClick={addField}>Add Field</Button>
                      </div>
                      <DynamicForm
                        fields={sectionObj.fields}
                        currentField={currentField}
                        changeCurrentField={changeCurrentField}
                        handelLabelChange={handelLabelChange}
                      />
                    </DynamicCard>
                  )
                })
              }
            </div>
            <div className=" col-span-1">
              <Card heading="Field Configuration">
                {/* <pre>{JSON.stringify(fieldConfiguration, null, 2)}</pre> */}
                <div className="grid grid-cols-1">
                  <Input
                    fieldParentSectionCode="label"
                    fieldConfig={{
                      displayName: "Label",
                      type: "text",
                      placeholder: "Enter label",
                      name: "label",
                      code: "label",
                      _id: 111,
                    }}
                    value={fieldConfiguration?.label}
                    handelChange={handelFieldConfigurationChange}
                  />
                </div>
                <div className="grid grid-cols-1">
                  <Input
                    fieldParentSectionCode="name"
                    fieldConfig={{
                      displayName: "Name",
                      type: "text",
                      placeholder: "Enter name",
                      name: "name",
                      code: "name",
                      _id: 112,
                    }}
                    value={fieldConfiguration?.name}
                    handelChange={handelFieldConfigurationChange}
                  />
                </div>
                <div className="grid grid-cols-1">
                  <Input
                    fieldParentSectionCode="placeholder"
                    fieldConfig={{
                      displayName: "Placeholder",
                      type: "text",
                      placeholder: "Enter placeholder",
                      name: "placeholder",
                      code: "placeholder",
                      _id: 113,
                    }}
                    value={fieldConfiguration?.placeholder}
                    handelChange={handelFieldConfigurationChange}
                  />
                </div>
                <div className="grid grid-cols-1">
                  <Input
                    fieldParentSectionCode="length"
                    fieldConfig={{
                      displayName: "Lenght",
                      type: "text",
                      placeholder: "Enter lenght",
                      name: "length",
                      code: "length",
                      _id: 114,
                    }}
                    value={fieldConfiguration?.length}
                    handelChange={handelFieldConfigurationChange}
                  />
                </div>
                <div className="grid grid-cols-1">
                  <Input
                    fieldParentSectionCode="options"
                    fieldConfig={{
                      displayName: "Options",
                      type: "text",
                      placeholder: "Enter options",
                      name: "options",
                      code: "options",
                      _id: 115,
                    }}
                    value={fieldConfiguration?.options}
                    handelChange={handelFieldConfigurationChange}
                  />
                </div>
                <div className="grid grid-cols-1">
                  <Input
                    fieldParentSectionCode="default_option"
                    fieldConfig={{
                      displayName: "Default Option",
                      type: "text",
                      placeholder: "Enter default option",
                      name: "default_option",
                      code: "defaultOption",
                      _id: 116,
                    }}
                    value={fieldConfiguration?.default_option}
                    handelChange={handelFieldConfigurationChange}
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name="is_required"
                    checked={fieldConfiguration?.isRequired}
                    onChange={(e) => {
                      handelCheckboxChnage("is_required", "isRequired", e);
                    }}
                  />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">
                    Is Mandatory
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name="hidden"
                    checked={fieldConfiguration?.hidden}
                    onChange={(e) => {
                      handelCheckboxChnage("hidden", "hidden", e);
                    }}
                  />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">
                    Hidden
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name="read_only"
                    checked={fieldConfiguration?.readOnly}
                    onChange={(e) => {
                      handelCheckboxChnage("read_only", "readOnly", e);
                    }}
                  />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">
                    Read Only
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name="in_list_view"
                    checked={fieldConfiguration?.inListView}
                    onChange={(e) => {
                      handelCheckboxChnage("in_list_view", "inListView", e);
                    }}
                  />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">
                    In List View
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    name="in_filter_list"
                    checked={fieldConfiguration?.inFilterList}
                    onChange={(e) => {
                      handelCheckboxChnage("in_filter_list", "inFilterList", e);
                    }}
                  />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">
                    In Filter List
                  </label>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
};

export default Add;
