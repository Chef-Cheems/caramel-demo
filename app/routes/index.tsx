import { useLoaderData } from 'remix';
import { useRevalidate } from 'remix-utils';
import useSWR from 'swr';
import { getFarms, Farm } from '~/caramel';
import { styled } from '~/stitches.config';

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

  return (
    <div>
      <StyledFarmList>
        {loaderData?.map((farm) => {
          return (
            <li key={farm.pid}>
              {farm.pid} - {farm.lpSymbol} - {farm.lpAddress} -{' '}
              {farm.poolWeight}
            </li>
          );
        })}
      </StyledFarmList>
    </div>
  );
}
