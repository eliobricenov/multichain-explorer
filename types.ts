export type EXPLORER = "etherscan" | "polygonscan";

export type Transaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  isError: string;
  txreceipt_status: string;
};

export type TransactionDetail = {
  transactionIndex: string | null;
  blockHash: string | null;
  blockNumber: string | null;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  nonce: string;
  to: string;
  value: string;
  type: string;
  chainId: string;
  timestamp: string | null;
  explorer: EXPLORER;
  status: string | null;
};
