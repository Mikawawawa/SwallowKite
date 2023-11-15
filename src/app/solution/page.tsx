import { SceneComponent } from "@/components/MainScene";
import * as React from "react";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import { DrawerComponent } from "@/components/Drawer";
import { Box, Toolbar } from "@mui/material";

export default function Home() {
  return (
    <Stack
      direction="row"
      component={"main"}
      sx={{
        flex: 1,
        flexWrap: "nowrap",
        padding: 3,
        overflow: "hidden",
      }}
      spacing={2}
    >
      <DrawerComponent />

      <Box
        sx={{
          height: "100%",
          flex: 3,
        }}
      >
        <SceneComponent />
      </Box>
    </Stack>
  );
}
