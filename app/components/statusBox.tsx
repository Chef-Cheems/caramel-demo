import { styled } from "~/stitches.config";

const StatusBox = styled(
  "div",
  {
    width: "20px",
    height: "20px",
    borderRadius: "2px",
    background: "#eee",

    variants: {
      status: {
        broken: {
          background: "OrangeRed",
        },
        active: {
          background: "PaleGreen",
          cursor: "pointer",
        },
        inactive: {
          background: "#eee",
          cursor: "pointer",
        },
      },
    },
  },
  {
    defaultVariants: {
      status: "inactive",
    },
  }
);

export default StatusBox;
