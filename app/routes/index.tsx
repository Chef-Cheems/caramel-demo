import { useLoaderData } from 'remix';
import { useRevalidate } from 'remix-utils';
import useSWR from 'swr';
import { getFarms } from '~/caramel';
import { styled } from '~/stitches.config';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectViewport,
  SelectItemIndicator,
  SelectItemText,
} from '~/components/select';
import { useState } from 'react';
import orderBy from 'lodash/orderBy';

const StyledFarmList = styled('ul', {});

export const loader = async () => {
  try {
    return getFarms();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function Index() {
  const loaderData =
    useLoaderData<Awaited<ReturnType<typeof loader>>>();

  let revalidate = useRevalidate();

  useSWR('index', () => revalidate(), {
    refreshInterval: 1000,
  });

  const [select, setSelect] = useState('default');

  return (
    <div>
      Sort By
      <Select value={select} onValueChange={setSelect}>
        <SelectTrigger aria-label="Food">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectViewport>
            <SelectItem value="default">
              <SelectItemText>default</SelectItemText>
              <SelectItemIndicator>-</SelectItemIndicator>
            </SelectItem>
            <SelectItem value="pid">
              <SelectItemText>pid</SelectItemText>
              <SelectItemIndicator>-</SelectItemIndicator>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </Select>
      <StyledFarmList>
        {orderBy(loaderData, select === 'default' ? [] : select)?.map(
          (farm) => {
            return (
              <li key={farm.pid}>
                {farm.pid} - {farm.lpSymbol} - {farm.lpAddress} -{' '}
                {farm.poolWeight}
              </li>
            );
          },
        )}
      </StyledFarmList>
    </div>
  );
}
