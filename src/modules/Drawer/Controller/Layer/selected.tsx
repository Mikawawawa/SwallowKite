import {
  Card,
  styled,
  Box,
  IconButton,
  Typography,
  BoxProps,
  Tabs,
  TabList,
  tabClasses,
  Tab,
  Stack,
} from "@mui/joy";

import React, {
  useRef,
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  ReactNode,
  useState,
} from "react";

import { Flipped, spring } from "react-flip-toolkit";
import { PaperCard } from "./styled";
import { LayerBasicConfig } from "../Config/layer";
import { TextureLayerForRender } from "@/hooks/useLayerReducer";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Collapse } from "@mui/material";

const FadeInBox = (props: BoxProps) => {
  return (
    <Box
      {...props}
      data-fade-in
      sx={{
        ...(props.sx || {}),
        opacity: 0,
      }}
    />
  );
};

export const SelectedLayer: FunctionComponent<
  PropsWithChildren<{
    index: number;
    setSelected: () => void;
    closeSelected: () => void;
    selected: boolean;
    onChange: (value: any) => void;
    item: TextureLayerForRender;
    configor: ReactNode;
  }>
> = ({
  index,
  setSelected,
  closeSelected,
  selected,
  item,
  children,
  onChange,
  configor,
}) => {
  const [active, setActive] = useState<"basic" | "props">("props");
  const elRef = useRef<null | HTMLDivElement>(null);

  const animateIn = () => {
    Array.from(
      elRef.current?.querySelectorAll?.("*[data-fade-in]") || []
    ).forEach((el, i) => {
      spring({
        values: {
          translateY: [-15, 0],
          opacity: [0, 1],
        },
        // @ts-ignore
        onUpdate: ({ translateY, opacity }) => {
          // @ts-ignore
          el.style!.opacity = opacity;
          // @ts-ignore
          el.style.transform = `translateY(${translateY}px)`;
        },
        delay: i * 75,
      });
    });
  };

  const parentId = `guitar-${index}`;

  return (
    <Flipped flipId={`${parentId}-productBackground`} onComplete={animateIn}>
      <PaperCard
        ref={elRef}
        sx={{
          cursor: "pointer",
        }}
      >
        <IconButton
          onClick={selected ? closeSelected : setSelected}
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
      </PaperCard>
    </Flipped>
  );
};
