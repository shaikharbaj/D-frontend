import React from "react";
import { Button } from "../button/Button";

type Props = {
  fields: any;
  handelLabelChange?: any
};

const DynamicForm: React.FunctionComponent<Props> = ({ fields, handelLabelChange }) => {

  const [currentField, setCurrentField] = React.useState(0);
  const [fieldConfiguration, setFieldConfiguration] = React.useState({});

  const handelInputField = (fieldConfig: any) => {
    switch (fieldConfig.type) {
      case "text":
        return renderInputField(fieldConfig);
      case "number":
        return renderInputField(fieldConfig);
      case "password":
        return renderInputField(fieldConfig);
      case "textarea":
        return renderTextareaField(fieldConfig);
      case "select":
        return renderSelectField(fieldConfig);
      case "checkbox":
        return renderCheckboxField(fieldConfig);
      case "radio":
        return renderRadioField(fieldConfig);
      case "file":
        return renderFileField(fieldConfig);
      case "file_image":
        return renderImageFileField(fieldConfig);
      case "date":
        return renderDateField(fieldConfig);
      case "datetime-local":
        return renderDateTimeField(fieldConfig);
        case "button":
            return renderButton(fieldConfig);  
    }
  };

  const renderLabelInput = (fieldIndex: any, fieldConfig: any) => {
    return (
      <input
        type="text"
        placeholder="No Label"
        style={{ border: "none", outline: "none" }}
        className="text-sm font-bold text-[#102030] dark:text-gray-400"
        onChange={(e) =>
          handelLabelChange(fieldIndex, fieldConfig?.code, e)
        }
      />
    );
  };

  const renderInputField = (fieldConfig: any) => {
    return (
      <input
        type={fieldConfig.type}
        className="w-full text-sm border-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-3 mt-1 bg-transparent"
        placeholder={fieldConfig.placeholder}
      />
    );
  };

  const renderTextareaField = (fieldConfig: any) => {
    return (
      <textarea
        className="w-full text-sm border-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-3 mt-1 bg-transparent"
        placeholder={fieldConfig.placeholder}
      ></textarea>
    );
  };

  const renderSelectField = (fieldConfig: any) => {
    return (
      <select className="w-full text-sm border-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-3 mt-1 bg-transparent">
        <option value="">{fieldConfig.placeholder}</option>
      </select>
    );
  };

  const renderCheckboxField = (fieldConfig: any) => {
    return <input type="checkbox" className="mr-2" />;
  };

  const renderRadioField = (fieldConfig: any) => {
    return (
      <>
        <br />
        <input type="radio" className="mr-2" />
      </>
    );
  };

  const renderFileField = (fieldConfig: any) => {
    return (
      <input
        type={fieldConfig.type}
        className="w-full text-sm border-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-3 mt-1 bg-transparent"
      />
    );
  };

  const renderImageFileField = (fieldConfig: any) => {
    return (
      <input
        type="file"
        className="w-full text-sm border-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-3 mt-1 bg-transparent"
        accept="image/*"
      />
    );
  };

  const renderDateField = (fieldConfig: any) => {
    return (
      <input
        type={fieldConfig.type}
        className="w-full text-sm border-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-3 mt-1 bg-transparent"
      />
    );
  };

  const renderDateTimeField = (fieldConfig: any) => {
    return (
      <input
        type={fieldConfig.type}
        className="w-full text-sm border-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-3 mt-1 bg-transparent"
      />
    );
  };

  const renderButton = (fieldConfig: any) => {
    return (
        <Button>Add Field</Button>
    )
  };

  const handelFieldSectionClick = (fieldIndex: any) => {
    setCurrentField(fieldIndex);
    setFieldConfiguration(fields[fieldIndex]);
    console.log(fields)
  };

  return (
    <>
      {fields.map((field: any, fieldIndex: number) => {
        return (
          <div className="grid grid-cols-1 mb-4 mt-4" key={fieldIndex} onClick={() => handelFieldSectionClick(fieldIndex)}>
            <div
              style={{
                border: (currentField == fieldIndex) ? "1px solid gray" : '',
                height: field.type === "textarea" ? "110px" : "90px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <span>{fieldIndex}</span>
              {field.type === "checkbox" ? (
                <>
                  {handelInputField(field)}
                  {renderLabelInput(fieldIndex, field)}
                </>
              ) : (
                <>
                  {renderLabelInput(fieldIndex, field)}
                  {handelInputField(field)}
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DynamicForm;
