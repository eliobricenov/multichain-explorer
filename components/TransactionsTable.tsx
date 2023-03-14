"use client";

import { Fragment, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import dayjs from "dayjs";
import { formatEther, formatUnits } from "ethers";
import relativeTime from "dayjs/plugin/relativeTime";
import { EXPLORER, Transaction } from "@/types";
import { shortenAddress, shortenHash } from "@/utils/shorten-hash";
import Button from "@/components/Button";
import { EXPLORER_BLOCKCHAIN_NAME, EXPLORER_CURRENCY } from "@/constants";
import ExplorerLogo from "@/components/ExplorerLogo";
import clsx from "clsx";
import { PuzzlePieceIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

dayjs.extend(relativeTime);

type SortableRow = "value" | "timestamp";
type SortOrder = "asc" | "desc";

type Sort = {
  row: SortableRow;
  order: SortOrder;
};

function sortTransactions(transactions: Transaction[], sort: Sort) {
  return [...transactions].sort((a, b) => {
    const [firstTx, secondTx] = sort.order === "asc" ? [a, b] : [b, a];

    if (sort.row === "value") {
      return Number(firstTx.value) - Number(secondTx.value);
    }

    return Number(firstTx.timeStamp) - Number(secondTx.timeStamp);
  });
}

function SortArrow({ target, sort }: { target: SortableRow; sort?: Sort }) {
  let icon = "▼";

  if (sort) {
    icon = sort.order === "asc" ? "▲" : "▼";
  }

  return (
    <span
      className={clsx(
        sort?.row === target ? "text-gray-500" : "hidden text-gray-400",
        "group-hover:inline"
      )}
    >
      {icon}
    </span>
  );
}

function TransactionRow({
  explorer,
  transaction,
}: {
  explorer: EXPLORER;
  transaction: Transaction;
}) {
  const timestampMs = Number(transaction.timeStamp) * 1000;
  return (
    <tr className="bg-white">
      <td className="p-3 hover:underline">
        <Link href={`/tx/${transaction.hash}`} className="text-blue-800">
          {shortenHash(transaction.hash)}
        </Link>
      </td>
      <td className="p-3">{transaction.blockNumber}</td>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <td className="p-3 min-w-[120px]">{dayjs(timestampMs).fromNow()}</td>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="animate-in fade-in-50 z-50 overflow-hidden rounded-md bg-gray-500 text-white px-3 py-1.5 text-sm shadow-md">
            {dayjs(timestampMs).format("YYYY-MM-DD hh:mm:ss")}
            <Tooltip.Arrow className="text-gray-500" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <td className="p-3">{shortenAddress(transaction.from)}</td>
      <td className="p-3">{shortenAddress(transaction.to)}</td>
      <td className="p-3">
        {formatEther(transaction.value)} {EXPLORER_CURRENCY[explorer]}
      </td>
      <td className="p-3">{formatUnits(transaction.gasPrice, 9)}</td>
    </tr>
  );
}

const availableExplorers: EXPLORER[] = ["etherscan", "polygonscan"];

export default function TransactionsTable({
  transactions,
}: {
  transactions: Record<EXPLORER, Transaction[]>;
}) {
  const [sort, setSort] = useState<Sort>();
  const [explorer, setExplorer] = useState<EXPLORER>("etherscan");
  const explorerTxs = transactions[explorer];
  const displayTxs = sort ? sortTransactions(explorerTxs, sort) : explorerTxs;

  const toggleSort = (row: SortableRow) => {
    if (!sort || sort.row !== row) {
      setSort({ row, order: "asc" });
      return;
    }

    if (sort.order === "asc") {
      setSort({ row, order: "desc" });
      return;
    }

    setSort(undefined);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex gap-x-2">
        {availableExplorers.map((availableExplorer) => (
          <Button
            key={availableExplorer}
            className={clsx(
              "gap-x-2 uppercase",
              explorer === availableExplorer
                ? "bg-blue-400 text-white"
                : "bg-gray-300 hover:bg-gray-200"
            )}
            onClick={() => setExplorer(availableExplorer)}
          >
            {EXPLORER_BLOCKCHAIN_NAME[availableExplorer]} TRANSACTIONS
            <ExplorerLogo explorer={availableExplorer} width={20} height={20} />
          </Button>
        ))}
      </div>
      <div className="relative overflow-x-auto border border-gray-300 rounded shadow">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-gray-300 border-b">
            <tr>
              <th scope="col" className="p-3">
                Transaction Hash
              </th>
              <th scope="col" className="p-3">
                Block
              </th>
              <th
                scope="col"
                className="p-3 cursor-pointer group"
                onClick={() => toggleSort("timestamp")}
              >
                <div className="flex items-center gap-1">
                  Age
                  <SortArrow target="timestamp" sort={sort} />
                </div>
              </th>
              <th scope="col" className="p-3">
                <div className="flex items-center">From</div>
              </th>
              <th scope="col" className="p-3">
                <div className="flex items-center">To</div>
              </th>
              <th
                scope="col"
                className="p-3 cursor-pointer group"
                onClick={() => toggleSort("value")}
              >
                <div className="flex items-center gap-1">
                  Value
                  <SortArrow target="value" sort={sort} />
                </div>
              </th>
              <th scope="col" className="p-3">
                <div className="flex items-center">Gas Price</div>
              </th>
            </tr>
          </thead>
          <Tooltip.TooltipProvider>
            <tbody className="divide-y divide-gray-300">
              {displayTxs.length > 0 ? (
                <>
                  {displayTxs.map((transaction) => (
                    <Fragment key={transaction.hash}>
                      <TransactionRow
                        transaction={transaction}
                        explorer={explorer}
                      />
                    </Fragment>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={10}>
                    <div className="py-20 flex flex-col items-center">
                      <PuzzlePieceIcon
                        width={80}
                        height={80}
                        className="mx-auto"
                      />
                      <span>There are no transactions</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Tooltip.TooltipProvider>
        </table>
      </div>
    </div>
  );
}
