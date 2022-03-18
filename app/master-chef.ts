import { ethers } from 'ethers';
import MasterChefABI from '~/abi/masterchef.v1.json';

const provider = new ethers.providers.StaticJsonRpcProvider(
  'https://nodes.pancakeswap.com/',
);

const MC = '0x73feaa1eE314F8c655E354234017bE2193C9E24E';

const MasterChefContract = new ethers.Contract(
  MC,
  MasterChefABI,
  provider,
);

export async function getTotalPoolLength() {
  const poolLength = await MasterChefContract.poolLength();
  return poolLength.toNumber();
}
