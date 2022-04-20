import { ethers } from "ethers";
import MasterChefABI from "~/abi/masterchef.v1.json";
import MasterChefV2ABI from "~/abi/masterchef.v2.json";

const provider = new ethers.providers.StaticJsonRpcProvider(
  "https://nodes.pancakeswap.com/"
);

const MC = "0x73feaa1eE314F8c655E354234017bE2193C9E24E";
const MCv2 = "0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652";

const MasterChefContract = new ethers.Contract(MC, MasterChefABI, provider);

const MasterChefV2Contract = new ethers.Contract(
  MCv2,
  MasterChefV2ABI,
  provider
);

export async function getTotalPoolLength() {
  const poolLength = await MasterChefContract.poolLength();
  return poolLength.toNumber();
}

export async function getTotalPoolLengthv2() {
  const poolLength = await MasterChefV2Contract.poolLength();
  return poolLength.toNumber();
}
