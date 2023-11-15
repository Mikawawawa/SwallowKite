"use client";
import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { useRouter } from "next/router";
import {
  AspectRatio,
  Box,
  Button,
  Grid,
  IconButton,
  Sheet,
  Skeleton,
  Stack,
} from "@mui/joy";
import { useSolutionStorage } from "@/service/SolutionManger";

import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";

function BasicCardSkeleton() {
  return (
    <Card sx={{ minHeight: "280px", width: "100%" }}>
      <AspectRatio ratio="21/9">
        <Skeleton variant="overlay">
          <img
            alt=""
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          />
        </Skeleton>
      </AspectRatio>
      <Typography>
        <Skeleton>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries.
        </Skeleton>
      </Typography>
    </Card>
  );
}

function GradientCover({ name, createdAt, updatedAt, onClick }: any) {
  return (
    <Card sx={{ minHeight: "280px", width: "100%" }} onClick={onClick}>
      <CardCover>
        <img
          src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
          srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography level="title-lg" textColor="#fff">
          {name || "Untitled"}
        </Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        >
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

function AddCard({ onClick }: any) {
  return (
    <Card
      component="li"
      sx={{ width: "100%", minHeight: "280px", flexGrow: 1, cursor: "pointer" }}
      onClick={onClick}
    >
      <CardCover>
        <video
          autoPlay
          loop
          muted
          poster="https://assets.codepen.io/6093409/river.jpg"
        >
          <source
            src="https://assets.codepen.io/6093409/river.mp4"
            type="video/mp4"
          />
        </video>
      </CardCover>
      <CardContent sx={{ position: "relative" }}>
        <Typography
          level="body-lg"
          fontWeight="lg"
          textColor="#fff"
          sx={{
            position: "absolute",
            bottom: 0,
          }}
        >
          Add One
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function SolutionList() {
  const { inited, data, addItem } = useSolutionStorage(
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
            {data.map((item, index) => (
              <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                <GradientCover
                  {...item}
                  onClick={() => (location.href = `/solution?key=${item.key}`)}
                />
              </Grid>
            ))}

            <Grid xs={12} sm={6} md={4} lg={3}>
              <AddCard
                onClick={() => {
                  // @ts-ignore
                  addItem();
                }}
              />
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
