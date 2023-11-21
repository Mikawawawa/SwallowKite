"use client";
import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { AspectRatio, Box, IconButton, Skeleton } from "@mui/joy";

import { DeleteOutlineOutlined } from "@mui/icons-material";

export function BasicCardSkeleton() {
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

export function GradientCover({
  name,
  createdAt,
  updatedAt,
  onRemove,
  texture,
}: any) {
  return (
    <Card
      sx={{
        minHeight: "280px",
        width: "100%",
        position: "relative",
      }}
    >
      <CardCover>
        <img
          src={
            texture ||
            "https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
          }
          srcSet={
            texture ||
            "https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
          }
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

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          opacity: 0,
          zIndex: 1,
          transition: "all 0.3s ease-out",
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        <IconButton
          className="card-cta-delete"
          aria-label="bookmark Bahamas Islands"
          variant="outlined"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove?.();
          }}
          sx={{ position: "absolute", top: 1, right: 1, zIndex: 1 }}
        >
          <DeleteOutlineOutlined
            sx={{
              color: "white",
            }}
          />
        </IconButton>
      </Box>
    </Card>
  );
}

export function AddCard({ onClick }: any) {
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
