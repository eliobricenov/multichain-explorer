import { getTxDetail } from "@/lib";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import TxDetail from "@/components/TxDetail";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

dayjs.extend(relativeTime);

interface Props {
  params: {
    hash: string;
  };
}

export default async function TxDetailPage(props: Props) {
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
    <div className="flex flex-wrap flex-col border border-gray-300 rounded shadow p-6 divide-y">
      <TxDetail transaction={transaction} />
    </div>
  );
}
