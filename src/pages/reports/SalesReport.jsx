import React, { useState } from "react";
import { Container } from "../../components";
import FilterBtns from "../../components/button/FilterBtns";
import { useBranchOpt } from "../../hooks";
import RadioBtnGroup from "../../components/input/RadioBtnGroup";
import SalesReportIem from "./SalesReportIem";

export const SalesReport = () => {
  // const { branchOpts } = useBranchOpt();
  // console.log("branchOpts: " + branchOpts.Branches);

  const SalesReportData = [
    {
      date: "16 May, 2023",
      customerName: "Abdul Kuddus",
      branch: "Online",
      number: "01712244605",
      orderAmount: "1200 BDT",
      address: "86, R.K Tower, Sonargaon Road, Banglamotor, Dhaka",
      invoiceId: "1a",
    },
    {
      date: "16 May, 2023",
      customerName: "Abdul Kuddus",
      branch: "Online",
      number: "01712244605",
      orderAmount: "1200 BDT",
      address: "86, R.K Tower, Sonargaon Road, Banglamotor, Dhaka",
      invoiceId: "1b",
    },
    {
      date: "14 May, 2023",
      customerName: "Abdul Kuddus",
      branch: "Dagon Bhuiyan",
      number: "01712244605",
      orderAmount: "1200 BDT",
      invoiceId: "2b",
    },
    {
      date: "13 May, 2023",
      customerName: "Abdul Kuddus",
      branch: "Dagon Bhuiyan",
      number: "01712244605",
      orderAmount: "1200 BDT",
      invoiceId: "3c",
    },
  ];

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

  const [selectedBranch, setSelectedBranch] = useState("all");

  const [selectedTimeOpt, setSelectedTimeOpt] = useState("all");

  const extractDate = (data) => {
    // Check if data is an array
    if (!Array.isArray(data)) {
      throw new Error("extractDate() must accept an array as argument.");
    }

    // Extract date from the array
    const date = Array.from(new Set(data.map((report) => report.date)));

    return date;
  };

  // const filteredData =
  //   selectedBranch === "all"
  //     ? SalesReportData
  //     : SalesReportData.filter((data) => data.branch === selectedBranch);

  const dates = extractDate(SalesReportData);

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
        <div className="grid max-h-[60vh] gap-8 overflow-y-auto">
          {dates.map((date) => (
            <div key={date}>
              <h3 className="mb-2 font-bold ">{date}</h3>
              <div className="grid gap-4">
                {SalesReportData.map(
                  (data) =>
                    date === data.date && (
                      <div key={data.invoiceId}>
                        <SalesReportIem reportData={data} />
                      </div>
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
