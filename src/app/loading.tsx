import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Stack
      direction={"column"}
      sx={{
        width: "500px",
        paddingLeft: 3,
      }}
      spacing={2}
    >
      {Array(3)
        .fill(1)
        .map((item, index) => (
          <Skeleton
            key={index}
            width={500 - index * 40}
            sx={{ bgcolor: "gray", borderRadius: 2 }}
            variant="rectangular"
          />
        ))}
    </Stack>
  );
}
