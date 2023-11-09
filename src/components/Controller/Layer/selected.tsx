import { Card, styled, Box, IconButton, Typography, BoxProps } from "@mui/joy";

import React, {
  useRef,
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
} from "react";

import { Flipped, spring } from "react-flip-toolkit";
import { PaperCard } from "./styled";
import { LayerBasicConfig } from "../Config/layer";
import { TextureLayerForRender } from "@/drawer/useLayerReducer";

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
  }>
> = ({
  index,
  setSelected,
  closeSelected,
  selected,
  item,
  children,
  onChange,
}) => {
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
      <PaperCard ref={elRef} onClick={selected ? closeSelected : setSelected}>
        {children}

        <FadeInBox>
          {selected && (
            <LayerBasicConfig
              config={item}
              onChange={(newConfig) => {
                console.log(newConfig);
                onChange?.(newConfig);
              }}
            />
          )}
        </FadeInBox>
      </PaperCard>
    </Flipped>
  );
};
