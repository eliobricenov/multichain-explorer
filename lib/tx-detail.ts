import { etherscanApi, polygonscanApi } from "@/lib/apis";
import { EXPLORER, TransactionDetail } from "@/types";

const apis: Record<EXPLORER, typeof etherscanApi> = {
  etherscan: etherscanApi,
  polygonscan: polygonscanApi,
};

async function fetchTxDetail(
  txHash: string,
  explorer: EXPLORER
): Promise<TransactionDetail | null> {
  const api = apis[explorer];
  const response = await api.get("/api", {
    params: {
      txhash: txHash,
      module: "proxy",
      action: "eth_getTransactionByHash",
    },
  });

  const responseData = response.data.result;

  if (!responseData || responseData.error) {
    return null;
  }

  if (responseData?.blockNumber) {
    const blockResponse = await api.get("/api", {
      params: {
        blockno: parseInt(responseData.blockNumber),
        module: "block",
        action: "getblockreward",
      },
    });
    responseData.timestamp = blockResponse.data.result.timeStamp;
  }

  if (responseData?.hash) {
    const statusResponse = await api.get("/api", {
      params: {
        txhash: responseData.hash,
        module: "transaction",
        action: "gettxreceiptstatus",
      },
    });
    responseData.status = statusResponse.data.result.status;
  }

  return { ...responseData, explorer };
}

export async function getTxDetail(txHash: string) {
  const ethereumTx = await fetchTxDetail(txHash, "etherscan");

  if (!ethereumTx) {
    return fetchTxDetail(txHash, "polygonscan");
  }

  return ethereumTx;
}
