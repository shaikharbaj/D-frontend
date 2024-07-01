/* eslint-disable @next/next/no-img-element */
import React from "react";
import { cn } from "@/lib/utils";

interface ISelectProps {
  fieldParentSectionCode: string;
  fieldConfig?: any;
  value?: string;
  error?: string | null;
  handelChange?: any;
}

const Select: React.FunctionComponent<ISelectProps> = ({
  fieldParentSectionCode,
  fieldConfig,
  value,
  error,
  handelChange,
}) => {
  return (
    <div className="mt-1">
      <label className=" text-sm font-bold text-[#102030] dark:text-gray-400">
        {fieldConfig.displayName}
      </label>
      <select
        className={cn(
          "w-full text-sm border-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-3 mt-1 bg-transparent",
          error ? "border-red-100" : "border-gray-100"
        )}
        name={fieldConfig.name}
        id={fieldConfig._id}
        onChange={(e) =>
          handelChange(fieldParentSectionCode, fieldConfig?.code, e)
        }
      >
        <option value="">{fieldConfig.placeholder}</option>
        {fieldConfig.options.map((option: any, optionIndex: number) => {
          return (
            <option key={optionIndex} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Select;
