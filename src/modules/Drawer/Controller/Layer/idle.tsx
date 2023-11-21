import { Card, styled, Box, IconButton } from "@mui/joy";

import React, {
  useRef,
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
} from "react";

import { Flipped, spring } from "react-flip-toolkit";
import { PaperCard } from "./styled";
import { usePrevious } from "react-use";

export const LayerCard: FunctionComponent<
  PropsWithChildren<{
    index: number;
    onClick: MouseEventHandler<unknown>;
    selected: boolean;
  }>
> = ({ index, onClick, children, selected }) => {
  const parentId = `guitar-${index}`;
  const previousSelected = usePrevious(selected);

  return (
    <Flipped flipId={`${parentId}-productBackground`}>
      <PaperCard onClick={onClick}>{children}</PaperCard>
    </Flipped>
  );
};
