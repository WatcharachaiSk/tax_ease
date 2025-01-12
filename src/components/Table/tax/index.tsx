import { TAX } from "@/constants/tax";
import React, { FC } from "react";

// interface TableTaxProps {}

const TableTax: FC = async ({}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xl text-gray-700 uppercase ">
          <tr className="">
            <th scope="col" className="px-6 py-3 bg-gray-50 ">
              รายได้สุทธิ (บาท)
            </th>
            <th scope="col" className="px-6 py-3">
              อัตราภาษี
            </th>
          </tr>
        </thead>
        <tbody>
          {TAX.TAX_BRACKETS_TABLE.map((item, idx) => {
            return (
              <tr
                key={idx}
                className="text-xl bg-white border-b  hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="px-10 py-1 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                >
                  {item.range}
                </th>
                <td className="px-10 py-1"> {item.rate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableTax;
