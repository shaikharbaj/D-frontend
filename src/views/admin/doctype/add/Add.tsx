"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Breadcrumb, Section, Loader, Card, Input, DynamicCard } from "@/components";
import { ComponentHOC } from "@/HOC";
import { Button } from "@/components/ui/button";

interface IAddProps {}

interface Field {
  id: string;
  type: string;
  label: string;
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

  //useEffect to load page configuration
  React.useEffect(() => {
    return () => {
      //cleanup
    };
  }, []);

  //Function to handel input change
  const handelChange = (section: string, field: string, event: any) => {};

  const addField = () => {
    const fieldType = fieldTypeSelectorRef.current?.value || 'text';
    setFields([...fields, { id: '101', type: fieldType, label: '' }]);
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
                displayName: 'Doctype Name',
                type: "text",
                placeholder: "Enter doctype name",
                name: "doctype_name",
                _id: 1,
              }}
              value=""
              error=""
              handelChange={handelChange}
            />
          </div>
        </Card>
        <Card heading="Configure Doctype Fields">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
            <div className=" col-span-2">
              <DynamicCard>
                  <select ref={fieldTypeSelectorRef}>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="textarea">Textarea</option>
                  </select>
                <div className="flex justify-between">
                  <Button onClick={addField}>
                    Add Field
                  </Button>
                </div>
              </DynamicCard>
            </div>
            <div className=" col-span-1">
              <Card heading="Field Configuration">
                <h1>hello</h1>
              </Card>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
};

export default Add;
