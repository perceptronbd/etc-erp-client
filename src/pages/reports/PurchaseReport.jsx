import React, { useEffect, useState } from "react";
import { Container } from "../../components";
import { getAllPurchaseReportApi } from "../../api/purchase-report/purchase-report";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import FilterBtns from "../../components/button/FilterBtns";
import PurchaseReportItem from "./PurchaseReportItem";
import ListSkeleton from "../../components/skeleton/ListSkeleton";
import FilterBtnsSkeleton from "../../components/skeleton/FilterBtnsSkeleton";
import { formatDate } from "../../utils/dateFormat";
import { filterDataByTimePeriod } from "../../utils/filterDataByTimePeriod";

export const PurchaseReport = () => {
  const timePeriodOptions = [
    "all",
    "today",
    "yesterday",
    "current month",
    "last week",
    "last month",
    "last 30 days",
    "current year",
  ];
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseReportData, setPurchaseReportData] = useState([]);
  const [selectedTimeOpt, setSelectedTimeOpt] = useState("all");
  const [filteredPurchaseReportData, setFilteredPurchaseReportData] = useState([]);

  const extractDate = (data) => {
    // Check if data is an array
    if (!Array.isArray(data)) {
      throw new Error("extractDate() must accept an array as argument.");
    }
    // Extract date from the array
    const date = Array.from(new Set(data.map((report) => report.purchaseDate)));
    return date;
  };
  const dates = extractDate(filteredPurchaseReportData);

  //Effect to filter data based on time period options
  useEffect(() => {
    const fitleredData = filterDataByTimePeriod(purchaseReportData, selectedTimeOpt);
    setFilteredPurchaseReportData(fitleredData);
  }, [selectedTimeOpt, purchaseReportData]);

  //Effect to fetch all purchase reports data
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
      <div className="mb-3 w-full text-lg font-medium ">Purchase Report</div>
      <div className="w-full rounded-lg bg-white p-5">
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
          className="mt-16 grid gap-8 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 188px)" }}
        >
          {isLoading ? (
            <ListSkeleton />
          ) : !dates.length ? (
            <div className="text-lg font-semibold text-rose-400">
              No Purchase Report Data Found!
            </div>
          ) : (
            dates.map((date) => (
              <div key={date}>
                <h3 className="mb-2 font-bold ">{formatDate(date)}</h3>
                <div className="grid gap-4">
                  {filteredPurchaseReportData.map(
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
