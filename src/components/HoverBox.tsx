import { Box } from "@mui/joy";
import { FunctionComponent, PropsWithChildren, useState } from "react";

const THRESHOLD = 5;

export const HoverBox: FunctionComponent<PropsWithChildren<{}>> = (props) => {
  const [Transform, setTransform] = useState<string>("");
  const [scale, setScale] = useState<boolean>(false);

  return (
    <Box
      sx={{
        position: "relative",
        transform: Transform,
        zIndex: scale ? 10 : 0,
        transition: "transform 0.1s ease",
        filter: scale
          ? "drop-shadow(0 4px 4px rgba(154, 137, 145, 0.5))"
          : "none",
        "&div": {
          transform: "translateZ(12px)",
        },
      }}
      onMouseMove={(e) => {
        setScale(true);
        const { clientX, clientY, currentTarget } = e;
        const { clientWidth, clientHeight, offsetLeft, offsetTop } =
          currentTarget;

        const horizontal = (clientX - offsetLeft) / clientWidth;
        const vertical = (clientY - offsetTop) / clientHeight;
        const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
        const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

        setTransform(
          `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1.06, 1.06, 1.06)`
        );
      }}
      onMouseLeave={(e) => {
        setScale(false);
        setTransform(
          `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`
        );
      }}
    >
      {props.children}
    </Box>
  );
};
