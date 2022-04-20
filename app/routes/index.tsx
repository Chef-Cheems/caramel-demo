import { useLoaderData } from "remix";
import { useRevalidate } from "remix-utils";
import {
  Provider as TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/tooltip";
import useSWR from "swr";
import { getFarmsv1, getFarmsv2, getHealth } from "~/caramel";
import { styled } from "~/stitches.config";
import { useState } from "react";
import orderBy from "lodash/orderBy";
import { getTotalPoolLength, getTotalPoolLengthv2 } from "~/master-chef";
import FarmRow from "~/components/farmRow";
import Controls from "~/components/controls";
import StatusBox from "~/components/statusBox";

const Flex = styled("div", {
  display: "flex",
});

const StyledFarmList = styled("div", {
  backgroundColor: "white",
  borderRadius: "8px",
  marginRight: "16px",
  marginLeft: "16px",
  padding: "8px",
  height: "35vh",
  overflow: "scroll",
  marginBottom: "8px",
});

const StatusWrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "2px",
  alignSelf: "baseline",
});

const FarmStatusGridsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "49%",
  alignSelf: "baseline",
  top: 20,
});

const Main = styled("main", {
  height: "100vh",
  backgroundImage:
    "linear-gradient(330deg, hsl(272, 53%, 50%) 0%, hsl(226, 68%, 56%) 100%)",
});

function scrollParentToChild(parent: any, child: any) {
  // Where is the parent on page
  var parentRect = parent.getBoundingClientRect();
  // What can you see?
  var parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth,
  };

  // Where is the child
  var childRect = child.getBoundingClientRect();
  // Is the child viewable?
  var isViewable =
    childRect.top >= parentRect.top &&
    childRect.bottom <= parentRect.top + parentViewableArea.height;

  // if you can't see the child try to scroll parent
  if (!isViewable) {
    // Should we scroll using top or bottom? Find the smaller ABS adjustment
    const scrollTop = childRect.top - parentRect.top;
    const scrollBot = childRect.bottom - parentRect.bottom;
    if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
      // we're near the top of the list
      parent.scrollTop += scrollTop;
    } else {
      // we're near the bottom of the list
      parent.scrollTop += scrollBot;
    }
  }
}

export const loader = async () => {
  try {
    return {
      farmsMCv1: await getFarmsv1(),
      farmsMCv2: await getFarmsv2(),
      health: await getHealth(),
      poolLengthv1: await getTotalPoolLength(),
      poolLengthv2: await getTotalPoolLengthv2(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function Index() {
  const loaderData = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  const { farmsMCv1, farmsMCv2, poolLengthv1, poolLengthv2, health } =
    loaderData || {};

  let revalidate = useRevalidate();

  useSWR("index", () => revalidate(), {
    refreshInterval: 1000,
  });

  const [select, setSelect] = useState("default");

  const [shouldFilterActive, setShouldFilterActive] = useState(false);

  return (
    <TooltipProvider>
      <Main>
        <Controls
          select={select}
          setSelect={setSelect}
          shouldFilterActive={shouldFilterActive}
          setShouldFilterActive={setShouldFilterActive}
          health={health}
        />
        <Flex>
          <div>
            <StyledFarmList id="styledFarmList">
              {orderBy(farmsMCv1, select === "default" ? [] : select)
                ?.filter((f) =>
                  shouldFilterActive ? parseFloat(f.poolWeight) > 0 : true
                )
                .map((farm) => {
                  return <FarmRow key={farm.pid} farm={farm} mcv={"MCv1"} />;
                })}
            </StyledFarmList>
            <StyledFarmList id="styledFarmListv2">
              {orderBy(farmsMCv2, select === "default" ? [] : select)
                ?.filter((f) =>
                  shouldFilterActive ? parseFloat(f.poolWeight) > 0 : true
                )
                .map((farm) => {
                  return <FarmRow key={farm.pid} farm={farm} mcv={"MCv2"} />;
                })}
            </StyledFarmList>
          </div>
          <FarmStatusGridsContainer>
            <h2 style={{ color: "white", fontWeight: 400, margin: 0 }}>
              MasterChef v1 ({poolLengthv1})
            </h2>
            <StatusWrapper>
              {Array.from({ length: poolLengthv1 }).map((_, i) => {
                const farm = farmsMCv1?.find((f) => f.pid === i);

                return (
                  <Tooltip key={i} delayDuration={0}>
                    <TooltipContent>{i}</TooltipContent>
                    <TooltipTrigger asChild>
                      <StatusBox
                        onClick={() => {
                          if (farm) {
                            scrollParentToChild(
                              document.getElementById("styledFarmList"),
                              document.getElementById(String(farm.pid))
                            );
                          }
                        }}
                        status={
                          farm
                            ? parseFloat(farm.poolWeight) > 0
                              ? "active"
                              : "inactive"
                            : "broken"
                        }
                      />
                    </TooltipTrigger>
                  </Tooltip>
                );
              })}
            </StatusWrapper>
            <h2 style={{ color: "white", fontWeight: 400, margin: 0 }}>
              MasterChef v2 ({poolLengthv2})
            </h2>
            <StatusWrapper>
              {Array.from({ length: poolLengthv2 }).map((_, i) => {
                const farm = farmsMCv2?.find((f) => f.pid === i);

                return (
                  <Tooltip key={i} delayDuration={0}>
                    <TooltipContent>{i}</TooltipContent>
                    <TooltipTrigger asChild>
                      <StatusBox
                        onClick={() => {
                          if (farm) {
                            scrollParentToChild(
                              document.getElementById("styledFarmListv2"),
                              document.getElementById(String(farm.pid))
                            );
                          }
                        }}
                        status={
                          farm
                            ? parseFloat(farm.poolWeight) > 0
                              ? "active"
                              : "inactive"
                            : "broken"
                        }
                      />
                    </TooltipTrigger>
                  </Tooltip>
                );
              })}
            </StatusWrapper>
          </FarmStatusGridsContainer>
        </Flex>
      </Main>
    </TooltipProvider>
  );
}
