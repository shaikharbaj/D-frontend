/* eslint-disable @next/next/no-img-element */
import React from "react";

interface ICounterCardProps {
    label: string;
    count: number | string;
    adder: number | string;
}

const CounterCard: React.FunctionComponent<ICounterCardProps> = (props) => {
  return (
    <>
    <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md shadow p-4 flex flex-1 items-center border">
        <div className=" rounded-xl rotate-45 h-12 w-12 flex items-center justify-center bg-[#de175b] shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 font-2xl text-white -rotate-45">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        </div>
        <div className="pl-4">
            <span className="text-xs text-[#777777] font-light uppercase">{props.label}</span>
            <div className="flex items-center ">
                <strong className="text-xl text-[#102030] dark:text-white font-bold">{props.count}</strong>
                <span className="text-xs text-green-500 pl-2">+{props.adder}</span>
            </div>
        </div>
    </div>
    </>
  );
};

export default CounterCard;




