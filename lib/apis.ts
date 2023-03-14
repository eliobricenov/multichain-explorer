import axios from "axios";
import { ETHERSCAN_API_KEY, POLYGONSCAN_API_KEY } from "@/constants";

export const etherscanApi = axios.create({
  baseURL: "https://api.etherscan.io",
  params: {
    apikey: ETHERSCAN_API_KEY,
  },
});

export const polygonscanApi = axios.create({
  baseURL: "https://api.polygonscan.com",
  params: {
    apikey: POLYGONSCAN_API_KEY,
  },
});
