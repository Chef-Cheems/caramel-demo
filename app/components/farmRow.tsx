import React from "react";
import { styled } from "@stitches/react";
import StatusBox from "./statusBox";
import { Farm } from "~/caramel";

const FarmRowContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "20px 50px 30px 140px 0.5fr 1fr",
  padding: "8px",
  marginBottom: "4px",
  gap: "8px",
});

const FarmRow: React.FC<{ farm: Farm; mcv: "MCv1" | "MCv2" }> = ({
  farm,
  mcv,
}) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(farm.lpAddress).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };
  return (
    <>
      <FarmRowContainer id={String(farm.pid)}>
        <StatusBox
          status={
            farm
              ? parseFloat(farm.poolWeight) > 0
                ? "active"
                : "inactive"
              : "broken"
          }
        />
        <div
          style={{
            borderRadius: "4px",
            padding: "2px",
            backgroundColor: mcv === "MCv1" ? "pink" : "orange",
          }}
        >
          {mcv}
        </div>
        <div>{farm.pid}</div>
        <div>{farm.lpSymbol}</div>
        <div>
          {`${farm.lpAddress.substring(0, 4)}..${farm.lpAddress.slice(-2)}`}{" "}
          <button onClick={copyAddress}>📋</button>
        </div>
        <div>{`${farm.multiplier}x (${farm.poolWeight})`}</div>
      </FarmRowContainer>
      <hr color="lightGrey" />
    </>
  );
};

export default FarmRow;
