import { Stack, StackProps } from "@mui/joy";

export const Surface = (props: StackProps) => {
  return (
    <Stack
      {...{
        ...(props || {}),
        sx: {
          boxShadow: "0 4px 4px rgba(204, 197, 185, 0.5)",
          backgroundColor: "#FFFFFF",
          ...(props.sx || {}),
        },
      }}
    />
  );
};
