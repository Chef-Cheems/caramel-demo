import { useLoaderData } from 'remix';
import { useRevalidate } from 'remix-utils';
import {
  Provider as TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/tooltip';
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
import { getTotalPoolLength } from '~/master-chef';

const Flex = styled('div', {
  display: 'flex',
});

const StyledFarmList = styled('ul', {});

const StatusWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2px',
  maxWidth: '49%',
  alignSelf: 'baseline',
  position: 'sticky',
  top: 20,
});

const StatusBox = styled(
  'div',
  {
    width: '20px',
    height: '20px',
    borderRadius: '2px',
    background: '#eee',

    variants: {
      status: {
        broken: {
          background: 'OrangeRed',
        },
        active: {
          background: 'PaleGreen',
          cursor: 'pointer',
        },
        inactive: {
          background: '#eee',
          cursor: 'pointer',
        },
      },
    },
  },
  {
    defaultVariants: {
      status: 'inactive',
    },
  },
);

export const loader = async () => {
  try {
    return {
      farms: await getFarms(),
      poolLength: await getTotalPoolLength(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function Index() {
  const loaderData =
    useLoaderData<Awaited<ReturnType<typeof loader>>>();

  const { farms, poolLength } = loaderData || {};

  let revalidate = useRevalidate();

  useSWR('index', () => revalidate(), {
    refreshInterval: 1000,
  });

  const [select, setSelect] = useState('default');

  const [shouldFilterActive, setShouldFilterActive] = useState(false);

  return (
    <TooltipProvider>
      <div>
        Sort By
        <Select value={select} onValueChange={setSelect}>
          <SelectTrigger aria-label="SortBy">
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
        <label>
          <input
            checked={shouldFilterActive}
            onChange={(e) => setShouldFilterActive(e.target.checked)}
            type="checkbox"
          />
          Active only
        </label>
        <Flex>
          <StyledFarmList>
            {orderBy(farms, select === 'default' ? [] : select)
              ?.filter((f) =>
                shouldFilterActive
                  ? parseFloat(f.poolWeight) > 0
                  : true,
              )
              .map((farm) => {
                return (
                  <li key={farm.pid} id={String(farm.pid)}>
                    {farm.pid} - {farm.lpSymbol} - {farm.lpAddress} -{' '}
                    {farm.poolWeight}
                  </li>
                );
              })}
          </StyledFarmList>
          <StatusWrapper>
            {Array.from({ length: poolLength }).map((_, i) => {
              const farm = farms?.find((f) => f.pid === i);

              return (
                <Tooltip key={i} delayDuration={0}>
                  <TooltipContent>{i}</TooltipContent>
                  <TooltipTrigger asChild>
                    <StatusBox
                      onClick={() => {
                        if (farm) {
                          document
                            .getElementById(String(farm.pid))
                            ?.scrollIntoView();
                        }
                      }}
                      status={
                        farm
                          ? parseFloat(farm.poolWeight) > 0
                            ? 'active'
                            : 'inactive'
                          : 'broken'
                      }
                    />
                  </TooltipTrigger>
                </Tooltip>
              );
            })}
          </StatusWrapper>
        </Flex>
      </div>
    </TooltipProvider>
  );
}
