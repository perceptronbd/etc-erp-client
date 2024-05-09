import React from "react";
import { Table } from "./../../components/index";
import { accounts } from "../../utils/mockData";
import { csbReferers } from "../../utils/mockData";
const { referdata } = csbReferers[0];
const { date } = csbReferers[0];

export const Referers = () => {
  const ignoreKeys = ["sn", "_id", "__v", "createdAt", "updatedAt", "units"];
  return (
    <>
      <div className="w-full ">
        <h5 className="my-4 text-base font-semibold">CSB Holders</h5>
        <div className="overflow-y-auto " style={{ maxHeight: "calc(100vh - 63px)" }}>
          <Table data={accounts} ignoreKeys={ignoreKeys} />
        </div>
      </div>
      <div className="w-7/12 mx-2">
        <div className="px-4 ">
          <div className="flex items-center justify-between my-4 heading">
            <h5 className="text-base font-semibold">Top 10 Referers</h5>
            <h5 className="text-base font-semibold">{date}</h5>
          </div>
          <div className="max-h-full overflow-y-auto" style={{ maxHeight: "calc(100vh - 63px)" }}>
            <Table data={referdata} ignoreKeys={ignoreKeys} />
          </div>
        </div>
      </div>
    </>
  );
};
