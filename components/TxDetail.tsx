"use client";

import { TransactionDetail } from "@/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  EXPLORER_BLOCKCHAIN_NAME,
  EXPLORER_CURRENCY,
  EXPLORER_URL,
} from "@/constants";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatEther, formatUnits } from "ethers";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

dayjs.extend(relativeTime);
dayjs.extend(utc);

function formatStatus(status: TransactionDetail["status"]) {
  if (!status) {
    return "Pending";
  }

  return status === "1" ? "Succeed" : "Failed";
}

export default function TxDetail({
  transaction,
}: {
  transaction: TransactionDetail;
}) {
  const explorerUrl = EXPLORER_URL[transaction.explorer];
  const currency = EXPLORER_CURRENCY[transaction.explorer];
  const timestampMs = Number(transaction.timestamp) * 1000;
  return (
    <>
      <div className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
        <div className="grid grid-cols-6 break-words">
          <span className="text-sm text-gray-500 col-span-6 md:col-span-1">
            Transaction Hash:
          </span>
          <span className="text-sm col-span-6 md:col-span-5">
            <Link
              href={`${explorerUrl}/tx/${transaction.hash}`}
              rel="noreferrer"
              target="_blank"
              className="text-blue-800 hover:underline flex gap-1"
            >
              {transaction.hash}
              <ArrowUpRightIcon width={12} />
            </Link>
          </span>
        </div>
        <div className="grid grid-cols-6 break-words">
          <span className="text-sm text-gray-500 col-span-6 md:col-span-1">
            Chain:
          </span>
          <span className="text-sm col-span-6 md:col-span-5 capitalize">
            {EXPLORER_BLOCKCHAIN_NAME[transaction.explorer]}
          </span>
        </div>
        <div className="grid grid-cols-6 break-words">
          <span className="text-sm text-gray-500 col-span-6 md:col-span-1">
            Status:
          </span>
          <span className="text-sm col-span-6 md:col-span-5">
            {formatStatus(transaction.status)}
          </span>
        </div>
        <div className="grid grid-cols-6 break-words">
          <span className="text-sm text-gray-500 col-span-6 md:col-span-1">
            Block:
          </span>
          <span className="text-sm col-span-6 md:col-span-5">
            {transaction.blockNumber
              ? parseInt(transaction.blockNumber, 16)
              : "Pending"}
          </span>
        </div>
        <div className="grid grid-cols-6 break-words">
          <span className="text-sm text-gray-500 col-span-6 md:col-span-1">
            Timestamp:
          </span>
          <span className="text-sm col-span-6 md:col-span-5">
            {dayjs(timestampMs).fromNow()} (
            {dayjs(timestampMs).utc().format("MMM-DD-YYYY hh:mm:ss A")} +UTC)
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
        <div className="grid grid-cols-6 break-words">
          <span className="text-sm text-gray-500 col-span-6 md:col-span-1">
            From:
          </span>
          <span className="text-sm col-span-6 md:col-span-5">
            {transaction.from}
          </span>
        </div>
        <div className="grid grid-cols-6 break-words">
          <span className="text-sm text-gray-500 col-span-6 md:col-span-1">
            To:
          </span>
          <span className="text-sm col-span-6 md:col-span-5">
            {transaction.to}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
        <div className="grid grid-cols-6 break-words">
          <span className="text-sm text-gray-500 col-span-6 md:col-span-1">
            Value:
          </span>
          <span className="text-sm col-span-6 md:col-span-5">
            {formatEther(transaction.value)} {currency}
          </span>
        </div>
        <div className="grid grid-cols-6 break-words">
          <span className="text-sm text-gray-500 col-span-6 md:col-span-1">
            Transaction Fee:
          </span>
          <span className="text-sm col-span-6 md:col-span-5">
            {transaction.gas} {currency}
          </span>
        </div>
        <div className="grid grid-cols-6 break-words">
          <span className="text-sm text-gray-500 col-span-6 md:col-span-1">
            Gas Price
          </span>
          <span className="text-sm col-span-6 md:col-span-5">
            {formatUnits(transaction.gasPrice, 9)} Gwei{" "}
            <span className="text-gray-500 text-sm">
              ({formatEther(transaction.gasPrice)} {currency})
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
