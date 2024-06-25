import React from "react";

type Props = {
  children: React.ReactNode;
  heading?: string | null | number;
};

const Card: React.FC<Props> = ({ children, heading }: Props) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative mt-3">
      <div className="flex-auto">
        {heading && (
          <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
            <div className="flex-none md:flex">
              <h4 className=" text-sm font-bold text-[#102030] dark:text-white flex-1 self-center mb-2 md:mb-0">
                {heading}
              </h4>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 p-3">{children}</div>
      </div>
    </div>
  );
};

export default Card;
