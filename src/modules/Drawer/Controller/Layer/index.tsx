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
import { SelectedLayer } from "./selected";
import { LayerCard } from "./idle";
import {
  Box,
  BoxProps,
  Card,
  IconButton,
  Stack,
  Tab,
  TabList,
  Tabs,
  tabClasses,
} from "@mui/joy";
import { debounce } from "@mui/material";

import { Flipped, spring } from "react-flip-toolkit";
import { PaperCard } from "./styled";
import { LayerBasicConfig } from "../Config/layer";
import { TextureLayerForRender } from "@/hooks/useLayerReducer";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Collapse } from "@mui/material";

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
    configor: ReactNode;
  }>
> = ({ index, selected, setSelected, children, onChange, item, configor }) => {
  const [active, setActive] = useState<"basic" | "props">("props");

  return (
    <Card
      sx={{
        cursor: "pointer",
      }}
    >
      <IconButton
        onClick={() => {
          setSelected(selected ? null : index);
        }}
        sx={{
          position: "absolute",
          top: 1,
          right: 1,
        }}
      >
        <ArrowRight
          sx={{
            transition: "all 0.2s ease-in",
            transform: `rotate(${selected ? 90 : 0}deg)`,
          }}
        />
      </IconButton>

      {configor}

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
