import { etherscanApi, polygonscanApi } from "@/lib/apis";
import { EXPLORER } from "@/types";
import { API_ADDRESS_ERROR } from "@/constants";

export async function getBalance(
  address: string
): Promise<Record<EXPLORER, string>> {
  const params = {
    address,
    module: "account",
    action: "balance",
    tag: "latest",
  };

  const [etherscanResponse, polygonscanResponse] = await Promise.all([
    etherscanApi.get("/api", { params }),
    polygonscanApi.get("/api", { params }),
  ]);

  let etherscanBalance = "0";
  let polygonscanBalance = "0";

  if (etherscanResponse.data.result !== API_ADDRESS_ERROR) {
    etherscanBalance = etherscanResponse.data.result;
  }

  if (polygonscanResponse.data.result !== API_ADDRESS_ERROR) {
    polygonscanBalance = polygonscanResponse.data.result;
  }

  return {
    etherscan: etherscanBalance,
    polygonscan: polygonscanBalance,
  };
}
