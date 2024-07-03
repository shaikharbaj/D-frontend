"use client";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";
import Draggable from "react-draggable";
import { useParams } from "next/navigation";
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
import { error } from "console";
import useDebounce from "@/hooks/useDebaunce";

interface IAddProps { }

interface Field {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
  readOnly: boolean;
}

const Edit: React.FunctionComponent<IAddProps> = () => {
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
        labelName: "Edit Doctype",
        is_link: false,
      },
    ],
  };
  const PAGECODE = "doctype_add";
  const router = useRouter();
  const { id } = useParams();
  const fieldTypeSelectorRef = React.useRef<HTMLSelectElement>(null);
  const [isPageInitialized, setIsPageInitialized] = React.useState(true);
  const [pageConfiguration, setPageConfiguration] = React.useState({});
  const [pageSections, setPageSections] = React.useState([]);
  const [formData, setFormData] = React.useState<any>({});
  const [formErrors, setFormErrors] = React.useState<any>({});
  const [page, setPage] = React.useState({
    doctype_name: "",
    doctype_code: "",
    doctype_status: "",
  });
  const debauncedValue = useDebounce(page.doctype_name, 600);
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
  //   React.useEffect(() => {
  //     initSection();
  //     return () => {
  //       //cleanup
  //     };
  //   }, []);

  //Use effect to handel current filed selection
  React.useEffect(() => {
    const currentSelectedSection = section[currentSection];
    const currentSelectedSectionFields = currentSelectedSection?.fields;
    if (currentSelectedSectionFields?.length > 0) {
      setFieldConfiguration(currentSelectedSectionFields[currentField]);
    }
  }, [currentField]);

  //Function to init section
    // const initSection = () => {
    //   setSection([
    //     ...section,
    //     {
    //       id: uuidv4(),
    //       section_name: "",
    //       type: "card",
    //       fields: [],
    //     },
    //   ]);
    // };

  //load docktype data.................
  const loadDoctypeById = async (id: any) => {
    try {
      const response = await axios.get(`http://localhost:5000/doctypes/${id}`);
      const data = await response.data;
    
      setPage((prev: any) => {
        return {
          ...prev,
          doctype_name: data?.doctype_name,
          doctype_code: data?.doctype_code,
          doctype_status: data?.doctype_status,
        };
      });
     
      setSection(data.sections);
      setFieldConfiguration(data.sections[0].fields[currentField]);
    } catch (error) { }
  };
  useEffect(() => {
    loadDoctypeById(id);
  }, []);

  //Function to handel change
  const handelChange = (parentSectionCode: any, fieldCode: any, e: any) => {

    if (fieldCode === "doctype_name") {
      setPage((prevField: any) => ({
        ...prevField,
        doctype_code: e.target.value.replace(/\s+/g, "-").toLowerCase(),
      }));
    }
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
            section_name: event.target.value,
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
            fields: newFields,
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
              fields: [...sectionObj.fields, currentObj],
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
    if (fieldCode === "label") {
      setFieldConfiguration((prevField: any) => ({
        ...prevField,
        name: e.target.value.toLowerCase(),
      }));
    }
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
            fields: newFields,
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
            fields: newFields,
          };
        }
        return section;
      });
    });
  };

  const handleformErrors = (data: any) => {
    const errors: any = {};

    // Regular expression to match only letters and spaces
    const validate_ISStringRegex = /^[a-zA-Z_-\s]+$/;

    if (!data?.doctype_name) {
      errors.doctype_name = "doctype name is required";
    } else if (!validate_ISStringRegex.test(data?.doctype_name)) {
      errors.doctype_name = "Enter a valid doctype name";
    }

    if (!data?.doctype_code) {
      errors.doctype_code = "doctype code is required";
    } else if (!validate_ISStringRegex.test(data?.doctype_code)) {
      errors.doctype_code = "Enter a valid doctype code";
    }

    if (!data?.doctype_status) {
      errors.doctype_status = "doctype status is required";
    }

    data?.sections?.forEach((section: any, sectionIndex: number) => {
      section.fields?.forEach((field: any, fieldIndex: number) => {
        let fieldErrors: any = {};

        // Validate label
        if (!field?.label) {
          fieldErrors.label = "Label is required";
        } else if (!validate_ISStringRegex.test(field.label)) {
          fieldErrors.label = "Enter a valid label";
        }

        // Validate name..........
        if (!field?.name) {
          fieldErrors.name = "Name is required";
        } else if (!validate_ISStringRegex.test(field.name)) {
          fieldErrors.name = "Enter a valid name";
        }

        // Validate placeholder
        if (!field?.placeholder) {
          fieldErrors.placeholder = "Placeholder is required";
        } else if (!validate_ISStringRegex.test(field.placeholder)) {
          fieldErrors.placeholder = "Enter a valid placeholder";
        }



        if (Object.keys(fieldErrors).length > 0) {
          if (!errors.sections) {
            errors.sections = [];
          }
          if (!errors.sections[sectionIndex]) {
            errors.sections[sectionIndex] = { fields: [] };
          }
          errors.sections[sectionIndex].fields[fieldIndex] = fieldErrors;
        }
      });
    });

    // Remove empty sections array if no section errors
    if (errors.sections) {
      errors.sections = errors.sections.filter((section: any) => section && section.fields.length);
      if (!errors.sections.length) {
        delete errors.sections;
      }
    }

    return errors;
  };

  //Function to handel doctypee submission
  const handelDoctypeSubmit = () => {
    const doctypePayload = {
      //   id: uuidv4(),
      doctype_name: page.doctype_name,
      doctype_code: page.doctype_code,
      doctype_status: page.doctype_status,
      sections: section,
    };
    const errors = handleformErrors(doctypePayload)
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      axios
        .patch(`http://localhost:5000/doctypes/${id}`, doctypePayload)
        .then((res) => {
          console.log(res.data);
          alert("Data submitted successfully.");
          // router.push(`/admin/doctypes`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const checkDoctypenameIsUnique = async () => {
    const response = await axios.get('http://localhost:5000/doctypes');
    const data = await response.data;
    const isNotAvailable = data.some((doctype: any) => ((doctype.doctype_name.toLowerCase() === page.doctype_name.toLowerCase()) && id !== doctype.id));
    if (isNotAvailable) {
      setFormErrors((prev: any) => {
        return { ...prev, doctype_name: "doctype_name is unavailable" }
      })
    } else {
      setFormErrors((prev: any) => {
        return { ...prev, doctype_name: "" }
      })
    }
  }
  useEffect(() => {
    //check doctype name is unique........
    checkDoctypenameIsUnique()

  }, [debauncedValue]);

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
              error={formErrors?.doctype_name}
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
              error={formErrors?.doctype_code}
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
                  { value: "inactive", label: "InActive" },
                  { value: "active", label: "Active" },
                ],
              }}
              value={page?.doctype_status}
              error={formErrors?.doctype_status}
              handelChange={handelChange}
            />
          </div>
          <div className="mt-8 flex justify-between">
            <Button onClick={() => handelDoctypeSubmit()}>Save</Button>
          </div>
        </Card>
        <Card heading="Configure Doctype Fields">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
            <div className=" col-span-2">
              {section.map((sectionObj: any, sectionObjIndex: number) => {
                return (
                  <DynamicCard
                    key={sectionObjIndex}
                    sectionIndex={sectionObjIndex}
                    sectionConfig={sectionObj}
                    handelSectionName={handelSectionName}
                  >
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
                );
              })}
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
                    error={formErrors?.sections?.length > 0 ? formErrors?.sections[0]?.fields[currentField]?.label : ""}
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
                    error={formErrors?.sections?.length > 0 ? formErrors?.sections[0]?.fields[currentField]?.name : ""}
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
                    error={formErrors?.sections?.length > 0 ? formErrors?.sections[0]?.fields[currentField]?.placeholder : ""}
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
                    error={formErrors?.sections?.length > 0 ? formErrors?.sections[0]?.fields[currentField]?.length : ""}
                  />
                </div>
                {(fieldConfiguration?.type === "radio" ||
                  fieldConfiguration?.type === "select") && (
                    <>
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
                    </>
                  )}

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

export default Edit;
