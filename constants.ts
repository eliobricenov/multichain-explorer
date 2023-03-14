import { EXPLORER } from "@/types";

export const API_ADDRESS_ERROR = "Error! Invalid address format";
export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY!;
export const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY!;

export const EXPLORER_CURRENCY: Record<EXPLORER, string> = {
  etherscan: "ETH",
  polygonscan: "MATIC",
};

export const EXPLORER_BLOCKCHAIN_NAME: Record<EXPLORER, string> = {
  etherscan: "ethereum",
  polygonscan: "polygon",
};

export const EXPLORER_URL: Record<EXPLORER, string> = {
  etherscan: "https://etherscan.io",
  polygonscan: "https://polygonscan.com",
};
