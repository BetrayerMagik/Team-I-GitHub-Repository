import React from "react";
import ReviewModal from "./ReviewModal";

const OrderCollapseTable = ({ data, method }) => {
  return (
    <tr key={data.email} className="relative whitespace-auto">
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-6">
        {data.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
        $ {parseFloat(data.cost).toFixed(2)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
        <ReviewModal title="Review Chef" data={data} />
      </td>
      <td className=" px-3 py-4 text-xs text-gray-500">
        {method === "delivery" ? (
          //   <ReviewItem />
          <ReviewModal title="Review Delivery" data={data} />
        ) : (
          "Only deliveries can review. "
        )}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-xs font-medium sm:pr-6"></td>
    </tr>
  );
};

export default OrderCollapseTable;