import React, { useEffect, useState } from "react";
import { Container } from "../../components";
import { getAllPurchaseReportApi } from "../../api/purchase-report/purchase-report";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import FilterBtns from "../../components/button/FilterBtns";
import PurchaseReportItem from "./PurchaseReportItem";
import ListSkeleton from "../../components/skeleton/ListSkeleton";
import FilterBtnsSkeleton from "../../components/skeleton/FilterBtnsSkeleton";

export const PurchaseReport = () => {
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
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseReportData, setPurchaseReportData] = useState([]);
  const [selectedTimeOpt, setSelectedTimeOpt] = useState("all");

  const extractDate = (data) => {
    // Check if data is an array
    if (!Array.isArray(data)) {
      throw new Error("extractDate() must accept an array as argument.");
    }

    // Extract date from the array
    const date = Array.from(new Set(data.map((report) => report.purchaseDate)));

    return date;
  };
  const dates = extractDate(purchaseReportData);

  const formatDate = (dateString) => {
    // Create a new Date object from the provided date string
    const date = new Date(dateString);

    // Define an array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the day, month, and year from the Date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Format the date as "Day Month, Year" (e.g., "16 May, 2023")
    const formattedDate = `${day} ${monthNames[monthIndex]}, ${year}`;

    return formattedDate;
  };

  // Example usage
  // const originalDateString = "2023-12-26T00:49:27.627Z";
  // const formattedDate = formatDate(originalDateString);
  // console.log(formattedDate); // Output: "26 December, 2023"

  useEffect(() => {
    setIsLoading(true);

    //logs("stockList useEffect:", [stocksData], Style.effects);

    const getAllPurchaseReport = async () => {
      const response = await getAllPurchaseReportApi(user.token);
      if (response.status === 200) {
        // console.log("stock reports", response.data.data);
        setPurchaseReportData(response.data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.data.message);
      }
    };
    getAllPurchaseReport();
  }, []);
  return (
    <Container className={"w-fit justify-start"}>
      <div className="w-full mb-3 text-lg font-medium ">Purchase Report</div>
      <div className="w-full p-5 bg-white rounded-lg">
        {isLoading ? (
          <FilterBtnsSkeleton />
        ) : (
          <FilterBtns
            data={timePeriodOptions}
            selectedState={selectedTimeOpt}
            setSelectedState={setSelectedTimeOpt}
          />
        )}
        <div
          className="grid gap-8 mt-16 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 227px)" }}
        >
          {isLoading ? (
            <ListSkeleton />
          ) : (
            dates.map((date) => (
              <div key={date}>
                <h3 className="mb-2 font-bold ">{formatDate(date)}</h3>
                <div className="grid gap-4">
                  {purchaseReportData.map(
                    (data) =>
                      date === data.purchaseDate && (
                        <div key={data._id}>
                          <PurchaseReportItem reportData={data} />
                        </div>
                      )
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};
