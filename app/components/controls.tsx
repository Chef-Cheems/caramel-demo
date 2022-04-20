import { styled } from "~/stitches.config";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectViewport,
  SelectItemIndicator,
  SelectItemText,
} from "~/components/select";
import StatusBox from "./statusBox";

const ControlsContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  background: "white",
  padding: "8px",
  marginBottom: "16px",
});

const Flex = styled("div", { display: "flex" });

const Controls: React.FC<{
  select: any;
  setSelect: any;
  shouldFilterActive: any;
  setShouldFilterActive: any;
  health: any;
}> = ({
  select,
  setSelect,
  shouldFilterActive,
  setShouldFilterActive,
  health,
}) => {
  return (
    <ControlsContainer>
      <span style={{ marginRight: "8px" }}>Sort By</span>
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
      <label style={{ marginLeft: "16px" }}>
        <input
          checked={shouldFilterActive}
          onChange={(e) => setShouldFilterActive(e.target.checked)}
          type="checkbox"
        />
        Active only
      </label>
      <Flex
        css={{
          marginLeft: "24px",
          border: "1px solid lightGrey",
          padding: "3px",
        }}
      >
        <StatusBox status="broken" />
        <span style={{ marginLeft: "3px", marginRight: "6px" }}>
          {" "}
          - broken or special
        </span>
        <StatusBox status="active" />
        <span style={{ marginLeft: "3px", marginRight: "6px" }}>
          {" "}
          - active (multiplier more than 0)
        </span>
        <StatusBox status="inactive" />
        <span style={{ marginLeft: "3px", marginRight: "6px" }}>
          {" "}
          - inactive (0x multiplier)
        </span>
      </Flex>
      {health?.details && (
        <Flex
          css={{
            marginLeft: "24px",
            border: "1px solid lightGrey",
            padding: "3px",
          }}
        >
          {health.details.mcv1IsOnTime ? (
            <StatusBox status="active" />
          ) : (
            <StatusBox status="broken" />
          )}
          <span style={{ marginLeft: "3px", marginRight: "6px" }}>
            - MCv1 API
          </span>
          {health.details.mcv1IsOnTime ? (
            <StatusBox status="active" />
          ) : (
            <StatusBox status="broken" />
          )}
          <span style={{ marginLeft: "3px", marginRight: "6px" }}>
            - MCv2 API
          </span>
        </Flex>
      )}
    </ControlsContainer>
  );
};

export default Controls;
