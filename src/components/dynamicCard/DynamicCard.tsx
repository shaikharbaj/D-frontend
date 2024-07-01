import React from "react";

type Props = {
  sectionIndex: number;
  sectionConfig?: any;
  handelSectionName?: any;
  children: React.ReactNode;
};

const DynamicCard: React.FC<Props> = ({ sectionIndex, sectionConfig, handelSectionName, children }: Props) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative mt-3">
      <div className="flex-auto">
        <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
            <div className="flex-none md:flex">
              <h4 className=" text-sm font-bold text-[#102030] dark:text-white flex-1 self-center mb-2 md:mb-0">
                <div>
                <input
                  type="text"
                  placeholder="No Label"
                  style={{ border: "none", outline: "none" }}
                  className="text-sm font-bold text-[#102030] dark:text-gray-400"
                  value={sectionConfig.section_name}
                  onChange={(e) => handelSectionName(sectionIndex, e)}
                />
                </div>
              </h4>
            </div>
          </div>
        <div className="grid grid-cols-1 p-3">{children}</div>
      </div>
    </div>
  );
};

export default DynamicCard;
