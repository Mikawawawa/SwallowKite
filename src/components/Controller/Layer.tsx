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
} from "@mui/joy";

import { Chip } from "@mui/joy";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { Box } from "@mui/material";

function ColorLayerCard() {
  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">色彩</Typography>
        <Typography level="body-sm">
          #F1C2DE{" "}
          <Box
            sx={{
              width: "32px",
              height: "18px",
              backgroundColor: "#F1C2DE",
            }}
          ></Box>
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
    </Card>
  );
}

function DotLayerCard() {
  return (
    <Card sx={{ width: 320 }}>
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
                  backgroundImage: "url(/kite.jpeg)",
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
    </Card>
  );
}

function ImageLayerCard() {
  return (
    <Card sx={{ width: 320 }}>
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
                  backgroundImage:
                    "url(https://pixijs.com/assets/bg_grass.jpg)",
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
    </Card>
  );
}

export const Layer = () => {
  return (
    <List
      size="sm"
      sx={{
        width: "100%",
        height: "100%",
        "--ListItem-radius": "8px",
        "--List-gap": "4px",
      }}
    >
      <ListItem nested>
        <ListSubheader>
          <Typography level="title-lg">图层</Typography>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <ListItem>
            <ColorLayerCard />
          </ListItem>

          <ListItem>
            <DotLayerCard />
          </ListItem>

          <ListItem>
            <ImageLayerCard />
          </ListItem>
          <ListItem>
            <Button variant="quiet">添加新图层</Button>
          </ListItem>
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
        </List>
      </ListItem>
    </List>
  );
};
