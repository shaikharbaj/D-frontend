"use client";
import React from "react";
import { Form } from "@/components";

interface IFormHOCProps {
  componentConfig: any;
  dataBinding?: any;
  errorBinding?: any;
  handelChange?: any;
  handelButtonClick?: any;
}

const FormHOC: React.FunctionComponent<IFormHOCProps> = ({
  componentConfig,
  dataBinding,
  errorBinding,
  handelChange,
  handelButtonClick,
}) => {
  return (
    <React.Fragment>
      <Form
        formConfig={componentConfig}
        formDataBinding={dataBinding}
        formErrorBinding={errorBinding}
        handelChange={handelChange}
        handelButtonClick={handelButtonClick}
      />
    </React.Fragment>
  );
};

export default FormHOC;
