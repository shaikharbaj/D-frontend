import React from "react";
import { Button } from "../ui/button";
import { Input } from "..";

interface IFormProps {
  formConfig: any;
  formDataBinding: any;
  formErrorBinding: any;
  handelChange?: any;
  handelButtonClick?: any;
}

const Form: React.FunctionComponent<IFormProps> = ({
  formConfig,
  formDataBinding,
  formErrorBinding,
  handelChange,
  handelButtonClick,
}) => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4">
        {formConfig.fields.map((field: any, fieldIndex: number) => {
          return (
            <React.Fragment key={fieldIndex}>
              {(() => {
                if (field?.type === "text") {
                  return (
                    <Input
                      fieldParentSectionCode={formConfig?.code}
                      fieldConfig={field}
                      value={formDataBinding[formConfig?.code][field?.code]}
                      error={formErrorBinding[formConfig?.code][field?.code]}
                      handelChange={handelChange}
                    />
                  );
                } else if (field?.type === "select") {
                  return "Select componenet";
                } else {
                  return "Another componenet";
                }
              })()}
            </React.Fragment>
          );
        })}
      </div>
      <div className="mt-8 flex justify-between">
        {formConfig.buttons.map((button: any, buttonIndex: number) => {
          return (
            <Button key={buttonIndex} onClick={() => handelButtonClick(button)}>
              {button?.displayName}
            </Button>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Form;
