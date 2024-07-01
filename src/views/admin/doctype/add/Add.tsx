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
  const [currentField, setCurrentField] = React.useState(0);
  const [fieldConfiguration, setFieldConfiguration] = React.useState<any>({
    label: "",
    type: "",
    name: "",
    placeholder: "",
    length: "",
    isRequired: false,
    readOnly: false,
    options: "",
    default_option: "",
  });

  //useEffect to load page configuration
  React.useEffect(() => {
    return () => {
      //cleanup
    };
  }, []);

  //Function to handel label change for the dynamic input
  const handelLabelChange = (fieldIndex: any, fieldConfig: any, event: any) => {
    setFields((prevFields) => {
      const newFields = [...prevFields];
      if (newFields[fieldIndex]) {
        newFields[fieldIndex].label = event.target.value;
      }
      return newFields;
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
        inFilterList: false
      };
      setFields([...fields, currentObj]);
      refreshFieldTypeSelector();
    } else {
      alert("Please select field type.");
    }
  };

  //Function to change current field
  const changeCurrentField = (currentIndex: number) => {
    setCurrentField(currentIndex);
    console.log('fields[currentIndex] ', fields[currentIndex]);
    setFieldConfiguration(fields[currentIndex]);
  };

  //Function to handel confuguration change
  const handelFieldConfigurationChange = (
    parentSectionCode: any,
    fieldCode: any,
    e: any
  ) => {
    console.log('fieldCode ', fieldCode)
    console.log('e.target.value ', e.target.checked)
    setFieldConfiguration((prevField: any) => ({
      ...prevField,
      [fieldCode]: e.target.value,
    }));

    setFields((prevFields) => {
      const newFields: any = [...prevFields];
      if (newFields[currentField]) {
        newFields[currentField][fieldCode] = e.target.value;
      }
      return newFields;
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

    setFields((prevFields) => {
      const newFields: any = [...prevFields];
      if (newFields[currentField]) {
        newFields[currentField][fieldCode] = e.target.checked;
      }
      return newFields;
    });
  };

  //Function to handel doctypee submission
  const handelDoctypeSubmit = () => {
    console.log('Fields ', fields);
  }

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
              handelChange={() => console.log("hello")}
            />
          </div>
          <div className="mt-8 flex justify-between">
            <Button onClick={() => handelDoctypeSubmit()}>
              Save
            </Button>
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
                  fields={fields}
                  currentField={currentField}
                  changeCurrentField={changeCurrentField}
                  handelLabelChange={handelLabelChange}
                />
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
                      code: "label",
                      _id: 1,
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
                      _id: 1,
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
                      _id: 1,
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
                      _id: 1,
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
                      _id: 1,
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
                      _id: 1,
                    }}
                    value={fieldConfiguration?.default_option}
                    handelChange={handelFieldConfigurationChange}
                  />
                </div>
                <div className="mt-2">
                  <input type="checkbox" name="is_required" checked={fieldConfiguration?.isRequired} onChange={(e) => {handelCheckboxChnage("is_required", 'isRequired', e)}} />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">
                    Is Mandatory
                  </label>
                </div>
                <div className="mt-2">
                  <input type="checkbox" name="hidden" checked={fieldConfiguration?.hidden} onChange={(e) => {handelCheckboxChnage("hidden", 'hidden', e)}} />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">
                    Hidden
                  </label>
                </div>
                <div className="mt-2">
                  <input type="checkbox" name="read_only" checked={fieldConfiguration?.readOnly} onChange={(e) => {handelCheckboxChnage("read_only", 'readOnly', e)}} />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">
                    Read Only
                  </label>
                </div>
                <div className="mt-2">
                  <input type="checkbox" name="in_list_view" checked={fieldConfiguration?.inListView} onChange={(e) => {handelCheckboxChnage("in_list_view", 'inListView', e)}} />
                  <label className="text-sm font-bold text-[#102030] dark:text-gray-400 ml-2">
                    In List View
                  </label>
                </div>
                <div className="mt-2">
                  <input type="checkbox" name="in_filter_list" checked={fieldConfiguration?.inFilterList} onChange={(e) => {handelCheckboxChnage("in_filter_list", 'inFilterList', e)}} />
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
