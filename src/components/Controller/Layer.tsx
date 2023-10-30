import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  IconButton,
  ListSubheader,
  Slider,
  Stack,
  Typography,
  styled,
} from "@mui/joy";

import { Chip } from "@mui/joy";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { TextureLayerForRender } from "@/drawer/useLayerReducer";

const PaperCard = styled(Card)(() => ({
  borderRadius: "0px",
}));

function ColorLayerCard(props: { color: string }) {
  return (
    <PaperCard sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">色彩</Typography>
        <Typography level="body-sm">
          {props.color}{" "}
          <Box
            sx={{
              width: "32px",
              height: "18px",
              backgroundColor: props.color,
            }}
          ></Box>
        </Typography>
      </div>
    </PaperCard>
  );
}

function DotLayerCard(props: { source: string }) {
  return (
    <PaperCard sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">图案</Typography>
        <Typography level="body-sm">
          <Stack
            direction="column"
            spacing={1}
            sx={{
              width: "100%",
            }}
          >
            <AspectRatio
              sx={{
                width: 300,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${props.source})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></Box>
            </AspectRatio>

            <Stack direction="column" sx={{ flex: 1 }}>
              <Stack direction="column">
                <label>左右间距</label>
                <Slider />
              </Stack>

              <Stack direction="column">
                <label>上下间距</label>
                <Slider />
              </Stack>

              <Stack direction="column">
                <label>缩放</label>
                <Slider />
              </Stack>
            </Stack>
          </Stack>
        </Typography>
      </div>

      {/* <CardContent orientation="horizontal">
          <Stack direction="row-reverse" spacing={2}>
            <IconButton
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              复制
            </IconButton>
  
            <IconButton
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              删除
            </IconButton>
          </Stack>
        </CardContent> */}
    </PaperCard>
  );
}

function ImageLayerCard(props: { source: string }) {
  return (
    <PaperCard sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">图案</Typography>
        <Typography level="body-sm">
          <Stack
            direction="column"
            spacing={1}
            sx={{
              width: "100%",
            }}
          >
            <AspectRatio
              sx={{
                width: 300,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${props.source})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></Box>
            </AspectRatio>
          </Stack>
        </Typography>
      </div>

      {/* <CardContent orientation="horizontal">
            <Stack direction="row-reverse" spacing={2}>
              <IconButton
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              >
                复制
              </IconButton>
    
              <IconButton
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              >
                删除
              </IconButton>
            </Stack>
          </CardContent> */}
    </PaperCard>
  );
}

export const Layer: FunctionComponent<{
  data: TextureLayerForRender[];
}> = ({ data }) => {
  return (
    <Stack
      sx={{
        width: "320px",
        height: "100%",
        "--ListItem-radius": "8px",
        "--List-gap": "4px",
      }}
    >
      {data?.map?.((item) => {
        console.log(item);
        switch (item.type) {
          case "pattern": {
            return (
              <Box key={item.id}>
                <DotLayerCard source={item.props.src} />
              </Box>
            );
          }
          case "image": {
            return (
              <Box key={item.id}>
                <ImageLayerCard source={item.props.src} />
              </Box>
            );
          }
          case "solid": {
            return (
              <Box key={item.id}>
                <ColorLayerCard color={item.props.content} />
              </Box>
            );
          }
        }
        // return (
        //   <ListItem key={item.id}>
        //     <DotLayerCard />
        //   </ListItem>
        // );
      })}
      {/* <ListItem>
            <ColorLayerCard />
          </ListItem>

          <ListItem>
            <DotLayerCard />
          </ListItem>

          <ListItem>
            <ImageLayerCard />
          </ListItem> */}
      <Box>
        <Button variant="soft">添加新图层</Button>
      </Box>
      {/* <ListItem>
            <ListItemButton>
              <ListItemDecorator
                sx={{ color: "neutral.500" }}
              ></ListItemDecorator>
              <ListItemContent>Policies</ListItemContent>
              <Chip
                variant="soft"
                color="neutral"
                size="sm"
                sx={{ borderRadius: "sm" }}
              >
                Beta
              </Chip>
            </ListItemButton>
          </ListItem> */}
    </Stack>
  );
};
