import { getTxDetail } from "@/lib";
import TxDetail from "@/components/TxDetail";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default async function TxDetailPage(props: {
  params: { hash: string };
}) {
  const transaction = await getTxDetail(props.params.hash);

  if (!transaction) {
    return (
      <div className="flex flex-col border border-gray-300 rounded shadow py-20 px-6 justify-center items-center gap-2">
        <ExclamationCircleIcon width={40} height={40} />
        <h1>Sorry, We are unable to locate this TxnHash</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap flex-col border border-gray-300 rounded shadow p-6 divide-y break-all">
      <TxDetail transaction={transaction} />
    </div>
  );
}
