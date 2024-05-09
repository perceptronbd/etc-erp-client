import React from "react";
import { Button } from "../../components";
import { Link } from "react-router-dom";

const SalesReportIem = ({ reportData }) => {
  console.log("Sales Report", reportData);
  return (
    <>
      <div>
        <div className="flex justify-between rounded-xl border p-4 shadow">
          <table>
            <tr>
              <td className="pr-2 font-medium">Customer Name </td>
              <td>: {reportData.customerName}</td>
            </tr>
            <tr>
              <td className="pr-2 font-medium">Number</td>
              <td>: {reportData.number}</td>
            </tr>
            <tr>
              <td className="pr-2 font-medium">Order Amount</td>
              <td>: {reportData.orderAmount}</td>
            </tr>
            {reportData.address && (
              <tr>
                <td className="pr-2 font-medium">Address</td>
                <td>
                  : <span className="italic">{reportData.address}</span>
                </td>
              </tr>
            )}
          </table>
          <div className="flex flex-col items-end justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 " />
              <span className="font-medium">{reportData.branch}</span>
            </div>
            <div>
              <Button className="bg-purple-500 ">
                <Link to={`invoice/${reportData.invoiceId}`}>Invoice</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesReportIem;
