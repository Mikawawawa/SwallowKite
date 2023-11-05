import { AspectRatio, Stack, Typography } from "@mui/joy";

import { Box } from "@mui/material";
import React, { FunctionComponent } from "react";

export const ImageLayerPreviewer = React.memo(function Previewer({
  config,
}: {
  config: any;
}) {
  return (
    <>
      <Typography level="title-lg">图片</Typography>
      <Typography level="body-sm">
        <Stack
          direction="column"
          spacing={1}
          sx={{
            width: "100%",
          }}
        >
          <AspectRatio maxHeight={100}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${config.src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></Box>
          </AspectRatio>
        </Stack>
      </Typography>
    </>
  );
});

export const ImageLayerConfig: FunctionComponent<{
  config: any;
  onChange: Function;
}> = React.memo(function Configure({ config, onChange }) {
  return (
    <>
      <Typography level="title-lg">TBD</Typography>
    </>
  );
});
