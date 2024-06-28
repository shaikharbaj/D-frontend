"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  Section,
  Loader,
  Card,
  Input,
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
  const [isPageInitialized, setIsPageInitialized] = React.useState(true);
  const [pageConfiguration, setPageConfiguration] = React.useState({});
  const [pageSections, setPageSections] = React.useState([]);
  const [formData, setFormData] = React.useState<any>({});
  const [formErrors, setFormErrors] = React.useState<any>({});
  const fieldTypeSelectorRef = React.useRef<HTMLSelectElement>(null);
  const [fields, setFields] = React.useState<Field[]>([]);

  console.log(fields);

  //useEffect to load page configuration
  React.useEffect(() => {
    return () => {
      //cleanup
    };
  }, []);

  //Function to handel input change
  const handelLabelChange = (fieldIndex: any, fieldConfig: any, event: any) => {
    setFields(prevFields => {
      const newFields = [...prevFields];
      if (newFields[fieldIndex]) {
        newFields[fieldIndex].label = event.target.value;
      }
      return newFields;
    });
  };

  const refreshFieldTypeSelector = () => {
    if (fieldTypeSelectorRef.current) {
      fieldTypeSelectorRef.current.value = "";
    }
  };

  const addField = () => {
    const fieldType = fieldTypeSelectorRef.current?.value;
    if (fieldType) {
      let currentObj = {
        label: "",
        type: fieldType,
        name: "",
        placeholder: "",
        isRequired: false,
        readOnly: false,
      };
      setFields([...fields, currentObj]);
      refreshFieldTypeSelector();
    } else {
      alert("Please select field type.");
    }
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
                displayName: "Doctype Name",
                type: "text",
                placeholder: "Enter doctype name",
                name: "doctype_name",
                _id: 1,
              }}
              value=""
              error=""
              handelChange={() => console.log('hello')}
            />
          </div>
        </Card>
        <Card heading="Configure Doctype Fields">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
            <div className=" col-span-2">
              <DynamicCard>
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
                    <option value="button">Button</option>
                    <option value="file">Attach</option>
                    <option value="file_image">Attach Image</option>
                    <option value="date">Date</option>
                    <option value="datetime-local">Datetime</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <Button onClick={addField}>Add Field</Button>
                </div>
                <DynamicForm fields={fields} handelLabelChange={handelLabelChange} />
              </DynamicCard>
            </div>
            <div className=" col-span-1">
              <Card heading="Field Configuration">
                <div className="grid grid-cols-1">
                  <Input
                    fieldParentSectionCode="label"
                    fieldConfig={{
                      displayName: "Label",
                      type: "text",
                      placeholder: "Enter label",
                      name: "label",
                      _id: 1,
                    }}
                    value=""
                    error=""
                    //handelChange={handelChange}
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
                      _id: 1,
                    }}
                    value=""
                    error=""
                    //handelChange={handelChange}
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
                      _id: 1,
                    }}
                    value=""
                    error=""
                    //handelChange={handelChange}
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
                      _id: 1,
                    }}
                    value=""
                    error=""
                    //handelChange={handelChange}
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
                      _id: 1,
                    }}
                    value=""
                    error=""
                    //handelChange={handelChange}
                  />
                </div>
                <div className="mt-2">
                  <input type="checkbox" name="is_nandatory" />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">Is Mandatory</label>
                </div>
                <div className="mt-2">
                  <input type="checkbox" name="hidden" />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">Hidden</label>
                </div>
                <div className="mt-2">
                  <input type="checkbox" name="read_only" />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">Read Only</label>
                </div>
                <div className="mt-2">
                  <input type="checkbox" name="in_list_view" />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">In List View</label>
                </div>
                <div className="mt-2">
                  <input type="checkbox" name="in_filter_list" />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">In Filter List</label>
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
