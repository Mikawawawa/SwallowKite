import { Box, Stack, Typography } from "@mui/joy";
import { SxProps } from "@mui/material";
import { FunctionComponent, PropsWithChildren, ReactNode } from "react";

export const DrawerColumn: FunctionComponent<
  PropsWithChildren<{
    sx?: SxProps;
    title: ReactNode;
  }>
> = ({ children, title, sx }) => {
  return (
    <>
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          height: "100%",
          ...sx,
        }}
      >
        <Typography
          level="title-lg"
          sx={{
            color: "white",
          }}
        >
          {title}
        </Typography>

        <Box
          className="drawer-content"
          sx={{
            flex: 1,
            boxShadow: 'md'
            // padding: 4,
            // backgroundColor: "white",
          }}
        >
          {children}
        </Box>
      </Stack>
    </>
  );
};
