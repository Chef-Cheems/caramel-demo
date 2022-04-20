// const API = "https://caramel.pancakeswap.com";
const API = "http://localhost:3000";

export interface Farm {
  pid: number;
  lpAddress: string;
  token: Token;
  quoteToken: Token;
  lpSymbol: string;
  tokenAmountTotal: string;
  quoteTokenAmountTotal: string;
  lpTotalSupply: string;
  lpTotalInQuoteToken: string;
  tokenPriceVsQuote: string;
  poolWeight: string;
  multiplier: string;
  isCommunity: boolean;
  tokenPriceBusd: string;
  quoteTokenPriceBusd: string;
  lpTokenPrice: string;
}

export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

export async function getFarmsv1() {
  const res = await fetch(`${API}/mcv1/farms?filter=all`);
  return (await res.json()) as Farm[];
}

export async function getFarmsv2() {
  const res = await fetch(`${API}/mcv2/farms?filter=all`);
  return (await res.json()) as Farm[];
}

export async function getHealth() {
  const res = await fetch(`${API}/health`);
  return await res.json();
}
