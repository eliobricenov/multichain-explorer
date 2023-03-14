import { etherscanApi, polygonscanApi } from "@/lib/apis";
import { EXPLORER, Transaction } from "@/types";
import { API_ADDRESS_ERROR } from "@/constants";

export async function getTxs(
  address: string
): Promise<Record<EXPLORER, Transaction[]>> {
  const params = {
    address,
    module: "account",
    action: "txlist",
    startblock: 0,
    endblock: 99999999,
    page: 1,
    offset: 100,
    sort: "desc",
  };

  const [etherscanResponse, polygonscanResponse] = await Promise.all([
    etherscanApi.get("/api", { params }),
    polygonscanApi.get("/api", { params }),
  ]);

  let etherscanTxs = [];
  let polygonscanTxs = [];

  if (etherscanResponse.data.result !== API_ADDRESS_ERROR) {
    etherscanTxs = etherscanResponse.data.result;
  }

  if (polygonscanResponse.data.result !== API_ADDRESS_ERROR) {
    polygonscanTxs = polygonscanResponse.data.result;
  }

  return {
    etherscan: etherscanTxs,
    polygonscan: polygonscanTxs,
  };
}
