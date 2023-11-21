"use client";
import * as React from "react";
import Typography from "@mui/joy/Typography";

import { Grid, Sheet, Stack } from "@mui/joy";
import { useSolutionStorage } from "@/service/SolutionManger";

import Link from "next/link";
import { HoverBox } from "@/components/HoverBox";
import {
  GradientCover,
  BasicCardSkeleton,
  AddCard,
} from "@/modules/Solution/Cards";

export default function SolutionList() {
  const { inited, data, addItem, removeItem } = useSolutionStorage(
    "swallow-kite-solutions"
  );

  return (
    <Stack
      component={Sheet}
      color="warning"
      variant="soft"
      sx={{
        width: "90%",
        minHeight: "90vh",
        margin: "auto",
        marginTop: 0,
        padding: "40px",
      }}
      spacing={4}
    >
      <Typography level="title-lg">Gallery</Typography>

      <Grid container spacing={{ xs: 2 }}>
        {inited ? (
          <>
            {data.map((item, index) => {
              const { key, ...restProps } = item || {};
              return (
                <Grid xs={12} sm={6} md={4} lg={3} key={key}>
                  <Link
                    href={`/solution/${key}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <HoverBox>
                      <GradientCover
                        {...restProps}
                        onRemove={() => {
                          removeItem(key);
                        }}
                      />
                    </HoverBox>
                  </Link>
                </Grid>
              );
            })}

            <Grid xs={12} sm={6} md={4} lg={3}>
              <HoverBox>
                <AddCard
                  onClick={() => {
                    // @ts-ignore
                    addItem();
                  }}
                />
              </HoverBox>
            </Grid>
          </>
        ) : (
          Array(4)
            .fill(1)
            .map((_, index) => (
              <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                <BasicCardSkeleton />
              </Grid>
            ))
        )}
      </Grid>
    </Stack>
  );
}
