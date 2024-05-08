import React, { useState } from "react";
import { Container } from "../../components";
import FilterBtns from "../../components/button/FilterBtns";

export const SalesReport = () => {
  const timePeriodOptions = [
    "all",
    "today",
    "yesterday",
    "current month",
    "last week",
    "last month",
    "last 30 days",
    "monthly report",
    "yearly report",
  ];

  const [selectedTimeOpt, setSelectedTimeOpt] = useState("all");

  return (
    <Container className={"w-fit justify-start"}>
      <div className="w-full py-4 text-start font-semibold">
        <h3>Sales Report</h3>
      </div>
      <div className="rounded-lg bg-white p-5">
        <FilterBtns
          data={timePeriodOptions}
          selectedState={selectedTimeOpt}
          setSelectedState={setSelectedTimeOpt}
        />
      </div>
    </Container>
  );
};
