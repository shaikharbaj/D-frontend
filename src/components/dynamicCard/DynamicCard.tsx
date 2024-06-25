import React from "react";

type Props = {
  children: React.ReactNode;
};

const DynamicCard: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative mt-3">
      <div className="flex-auto">
        <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
            <div className="flex-none md:flex">
              <h4 className=" text-sm font-bold text-[#102030] dark:text-white flex-1 self-center mb-2 md:mb-0">
                <div>
                <label
                    title="Double click to edit label"
                    contentEditable
                    suppressContentEditableWarning
                    //onDoubleClick={(e) => e.target.focus()} // Optional: Focus on double-click
                    style={{ border: '1px dashed gray', padding: '5px' }} // Optional: Visual feedback for editable state
                >
                    No Label
                </label>
                    {/* <i className="text-muted" contentEditable>No Label</i> */}
                    {/* <span>Span</span>
                    <input type="text" placeholder="Title Heres" /> */}
                </div>
                {/* <input type="text" placeholder="Title Heres" /> */}
              </h4>
            </div>
          </div>
        <div className="grid grid-cols-1 p-3">{children}</div>
      </div>
    </div>
  );
};

export default DynamicCard;
