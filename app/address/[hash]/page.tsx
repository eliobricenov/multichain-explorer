import { getBalance } from "@/lib/address-balance";
import OverviewCard from "@/components/OverviewCard";
import TransactionsTable from "@/components/TransactionsTable";
import { getTxs } from "@/lib";

export default async function AccountPage({
  params,
}: {
  params: { hash: string };
}) {
  const [balances, transactions] = await Promise.all([
    getBalance(params.hash),
    getTxs(params.hash),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <OverviewCard balances={balances} />
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
