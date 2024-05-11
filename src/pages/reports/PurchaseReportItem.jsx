import React from "react";
import { Button } from "../../components";
import { Link } from "react-router-dom";

const PurchaseReportItem = ({ reportData }) => {
  return (
    <>
      <div>
        <div className="flex justify-between rounded-xl border p-4 shadow">
          <table>
            <tr>
              <td className="pr-2 font-medium">Supplier Name </td>
              <td>: {reportData.supplierName}</td>
            </tr>
            <tr>
              <td className="pr-2 font-medium">Number</td>
              <td>: {reportData.supplierNumber}</td>
            </tr>
            <tr>
              <td className="pr-2 font-medium">Purchase Amount</td>
              <td>: {reportData.purchaseAmount}</td>
            </tr>

            <tr>
              <td className="pr-2 font-medium">Transportation</td>
              <td>: {reportData.transportationCost} BDT</td>
            </tr>
            <tr>
              <td className="pr-2 font-medium">Purchasing Cost</td>
              <td>: {reportData.totalPurchasingPrice} BDT</td>
            </tr>
          </table>
          <div className="flex flex-col items-end justify-end">
            <div>
              <Link to={`#`}>
                <Button className="bg-purple-500 " disabled>
                  See Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseReportItem;
