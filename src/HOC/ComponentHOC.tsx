"use client";
import React from "react";
import { Card } from "@/components";
import { TableHOC, FormHOC } from ".";

interface IComponentHOCProps {
  componentConfig: any;
  dataBinding?: any;
  errorBinding?: any;
  handelChange?: any;
  handelButtonClick?: any;
  handelTableAction?: any;
}
const ComponentHOC: React.FunctionComponent<IComponentHOCProps> = ({
  componentConfig,
  dataBinding,
  errorBinding,
  handelChange,
  handelButtonClick,
  handelTableAction
}) => {
  return (
    <React.Fragment>
      {componentConfig.length > 0 &&
        componentConfig.map((section: any, sectionIndex: number) => {
          if (section.fields.length > 0) {
            return (
              <Card heading={section?.name} key={sectionIndex}>
                <div key={sectionIndex}>
                  {(() => {
                    if (section?.type === "table") {
                      return <TableHOC componentConfig={section} handelTableAction={handelTableAction} />;
                    } else if (section?.type === "add_form" || section?.type === "edit_form") {
                      return (
                        <FormHOC
                          componentConfig={section}
                          dataBinding={dataBinding}
                          errorBinding={errorBinding}
                          handelChange={handelChange}
                          handelButtonClick={handelButtonClick}
                        />
                      );
                    } else {
                      return "Another componenet";
                    }
                  })()}
                </div>
              </Card>
            );
          }
        })}
    </React.Fragment>
  );
};

export default ComponentHOC;
