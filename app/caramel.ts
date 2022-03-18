const API = 'https://caramel.pancakeswap.com/v1';

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

export async function getFarms() {
  const res = await fetch(`${API}/farms?filter=all`);
  return (await res.json()) as Farm[];
}
