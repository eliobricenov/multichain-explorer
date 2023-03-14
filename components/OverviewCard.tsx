"use client";

import { formatEther } from "ethers";
import { EXPLORER } from "@/types";

export default function OverviewCard({
  balances,
}: {
  balances: Record<EXPLORER, string>;
}) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-300 gap-3 px-3 py-2 drop-shadow bg-gray-50 ">
      <span className="text-sm font-bold uppercase">Overview</span>
      <div className="flex flex-col">
        <span className="text-sm uppercase font-medium uppercase">
          ETH BALANCE
        </span>
        <span className="text-sm text-gray-700 uppercase">
          {formatEther(balances.etherscan)} ETH
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-700 uppercase font-medium">
          MATIC BALANCE
        </span>
        <span className="text-sm text-gray-700 uppercase">
          {formatEther(balances.polygonscan)} MATIC
        </span>
      </div>
    </div>
  );
}
