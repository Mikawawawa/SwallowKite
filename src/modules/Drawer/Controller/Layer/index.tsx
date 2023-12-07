import React, {
  useMemo,
  useRef,
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  ReactNode,
  useState,
  useCallback,
} from "react";
import { LayerCard } from "./idle";
import {
  Box,
  BoxProps,
  Card,
  CardActions,
  Stack,
  Tab,
  TabList,
  Tabs,
  styled,
  tabClasses,
  IconButton,
} from "@mui/joy";
import { debounce } from "@mui/material";

import { LayerBasicConfig } from "../Config/layer";
import { TextureLayerForRender } from "@/hooks/useLayerReducer";
import { ArrowLeft, ArrowRight, Delete, DragHandle } from "@mui/icons-material";
import { Collapse } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DndItem } from "@/components/DragSortable/Item";
import { TypeSelection } from "../Config";

// This part should be refactored
// Layer should just show the least information at first
// and the interaction should be more direct
export const Layer: FunctionComponent<
  PropsWithChildren<{
    index: number;
    selected: boolean;
    setSelected: (index: number | null) => void;
    item: TextureLayerForRender;
    onChange: (value: any) => void;
    onDelete: () => void;
    configor: ReactNode;
    dragHandlerProps: any;
  }>
> = ({
  index,
  selected,
  setSelected,
  children,
  onChange,
  item,
  configor,
  onDelete,
  dragHandlerProps,
}) => {
  const [active, setActive] = useState<"basic" | "props">("props");

  return (
    <Card
      sx={{
        cursor: "pointer",
      }}
      id={item.id}
    >
      {configor}

      <CardActions
        sx={{
          position: "relative",
        }}
      >
        <Box {...dragHandlerProps}>
          <IconButton size="sm" aria-label="add to favorites">
            <DragHandle />
          </IconButton>
        </Box>

        <IconButton size="sm" aria-label="share" onClick={onDelete}>
          <Delete />
        </IconButton>
        {item.type !== undefined && (
          <IconButton
            size="sm"
            sx={{ position: "absolute", right: 0, bottom: 0 }}
            onClick={() => {
              setSelected(selected ? null : index);
            }}
          >
            <ArrowRight
              sx={{
                transition: "all 0.2s ease-in",
                transform: `rotate(${selected ? 90 : 0}deg)`,
              }}
            />
          </IconButton>
        )}
      </CardActions>
      <Collapse in={selected}>
        <>
          <Tabs
            aria-label="tabs"
            value={active}
            defaultValue={0}
            onChange={(e, value) => {
              // @ts-ignore
              setActive(value);
            }}
            sx={{ bgcolor: "transparent" }}
            size="sm"
          >
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 0.5,
                borderRadius: "xl",
                bgcolor: "background.level1",
                [`& .${tabClasses.root}`]: {
                  flex: 1,
                },
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "background.surface",
                },
              }}
            >
              <Tab disableIndicator value="props">
                Props
              </Tab>
              <Tab disableIndicator value="basic">
                Basic
              </Tab>
            </TabList>
          </Tabs>

          <Stack direction="column">
            {active === "props" && children}
            {active === "basic" && (
              <LayerBasicConfig
                config={item}
                onChange={(newConfig: any) => {
                  onChange?.(newConfig);
                }}
              />
            )}
          </Stack>
        </>
      </Collapse>
    </Card>
  );
};

export const LayerInitializer: FunctionComponent<
  PropsWithChildren<{
    index: number;
    item: TextureLayerForRender;
    onDelete: () => void;

    setType: (type: TextureLayerForRender["type"]) => void;
  }>
> = ({ index, item, setType }) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
      }}
      id={item.id}
    >
      <Box>
        <TypeSelection onChange={setType} />
      </Box>
    </Card>
  );
};
