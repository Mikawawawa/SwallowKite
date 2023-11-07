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
  }>
> = ({ index, setSelected, closeSelected, selected, children }) => {
  const elRef = useRef<null | HTMLDivElement>(null);

  const animateIn = () => {
    Array.from(elRef.current?.querySelectorAll?.("*[data-fade-in]") || []).forEach(
      (el, i) => {
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
      }
    );
  };

  const parentId = `guitar-${index}`;

  return (
    <Flipped flipId={`${parentId}-productBackground`} onComplete={animateIn}>
      <PaperCard ref={elRef} onClick={selected ? closeSelected : setSelected}>
        {children}

        <FadeInBox>{selected && <Typography>aaaa</Typography>}</FadeInBox>
        {/* <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            border: 0,
            margin: "2em",
            cursor: "pointer",
          }}
          onClick={animateOut}
        >
          <Box
            sx={{
              display: "block",
              width: "1em",
              height: "1em",
              margin: "0 auto",
              fill: "currentColor",
            }}
          >
            <svg id="icon-cross" viewBox="0 0 24 24" width="100%" height="100%">
              <path d="M 5.5,2.5 C 5.372,2.5 5.244,2.549 5.146,2.646 L 2.646,5.146 C 2.451,5.341 2.451,5.659 2.646,5.854 L 8.793,12 2.646,18.15 C 2.451,18.34 2.451,18.66 2.646,18.85 L 5.146,21.35 C 5.341,21.55 5.659,21.55 5.854,21.35 L 12,15.21 18.15,21.35 C 18.24,21.45 18.37,21.5 18.5,21.5 18.63,21.5 18.76,21.45 18.85,21.35 L 21.35,18.85 C 21.55,18.66 21.55,18.34 21.35,18.15 L 15.21,12 21.35,5.854 C 21.55,5.658 21.55,5.342 21.35,5.146 L 18.85,2.646 C 18.66,2.451 18.34,2.451 18.15,2.646 L 12,8.793 5.854,2.646 C 5.756,2.549 5.628,2.5 5.5,2.5 Z" />
            </svg>
          </Box>
        </IconButton> */}
      </PaperCard>
    </Flipped>
  );
};
