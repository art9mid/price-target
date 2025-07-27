import apiClient from './index';

export interface PriceTargetData {
  high: number;
  low: number;
  mean: number;
  last_close: number;
  symbol: string;
  name: string;
  logo_url: string;
}

export async function fetchPriceTarget(
  symbol: string,
): Promise<PriceTargetData> {
  const response = await apiClient.get<PriceTargetData>(
    '/assessment/price-target',
    {
      params: {
        symbol,
      },
    },
  );
  return response.data;
}
