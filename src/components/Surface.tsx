import { Stack, StackProps } from "@mui/joy";

export const Surface = (props: StackProps) => {
  return (
    <Stack
      {...{
        ...(props || {}),
        sx: {
          boxShadow: "#767575 0px -2px 13px 1px",
          backgroundColor: "var(--joy-palette-background-surface)",
          ...(props.sx || {}),
        },
      }}
    />
  );
};
