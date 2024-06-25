/* eslint-disable @next/next/no-img-element */
import React from "react";
import { cn } from "@/lib/utils";

interface IInputProps {
  fieldParentSectionCode: string;
  fieldConfig?: any;
  value?: string;
  error?: string | null;
  handelChange?: any;
}

const Input: React.FunctionComponent<IInputProps> = ({
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
      <input
        type={fieldConfig.type}
        className={cn(
          "w-full text-sm border-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md p-3 mt-1 bg-transparent",
          error ? "border-red-100" : "border-gray-100"
        )}
        placeholder={fieldConfig.placeholder}
        name={fieldConfig.name}
        id={fieldConfig._id}
        value={value}
        onChange={(e) =>
          handelChange(fieldParentSectionCode, fieldConfig?.code, e)
        }
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
