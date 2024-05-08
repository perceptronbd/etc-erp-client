import React, { useState } from "react";
import { Container } from "../../components";
import FilterBtns from "../../components/button/FilterBtns";
import { useBranchOpt } from "../../hooks";
import RadioBtnGroup from "../../components/input/RadioBtnGroup";

export const SalesReport = () => {
  // const { branchOpts } = useBranchOpt();
  // console.log("branchOpts: " + branchOpts.Branches);
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

  const branchOpts = {
    Branches: ["Branch 1", "Branch 2", "Branch 3"],
  };
  branchOpts.Branches.unshift("all");

  const [selectedBranch, setSelectedBranch] = useState("all"); // State for the selected branch

  const [selectedTimeOpt, setSelectedTimeOpt] = useState("all");

  return (
    <Container className={"w-fit justify-start"}>
      <div className="w-full py-4 text-start font-semibold">
        <h3>Sales Report</h3>
      </div>
      <div className="flex flex-col gap-12 rounded-lg bg-white p-5">
        <FilterBtns
          data={timePeriodOptions}
          selectedState={selectedTimeOpt}
          setSelectedState={setSelectedTimeOpt}
        />

        <RadioBtnGroup
          options={branchOpts.Branches}
          selectedOption={selectedBranch}
          setSelectedOption={setSelectedBranch}
        />
      </div>
    </Container>
  );
};
