"use client";
import React from "react";
import { CounterCard } from "@/components";

interface IDashboardProps {
}

const Dashboard: React.FunctionComponent<IDashboardProps> = () => {
  return (
    <>
      <section className="flex flex-row py-4 px-3 gap-4 w-full flex-wrap">
        <CounterCard label="Customers" count={38} adder={3}/>
        <CounterCard label="Suppliers" count={1258} adder={12}/>
        <CounterCard label="Financers" count={10} adder={23}/>
        <CounterCard label="Loan Amount" count={86} adder={1263}/>
    </section>
    </>
  );
};

export default Dashboard;
