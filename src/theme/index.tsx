"use client";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";

const materialTheme = materialExtendTheme();
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { FunctionComponent, PropsWithChildren } from "react";

import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";

import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/joy";
import React from "react";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: -200 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export const Theme: FunctionComponent<PropsWithChildren<any>> = ({
  children,
}) => {
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({
      key: "theme",
    });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <MaterialCssVarsProvider
      defaultMode="light"
      theme={{ [MATERIAL_THEME_ID]: materialTheme }}
    >
      <JoyCssVarsProvider defaultMode="light">
        <CssBaseline />
        <motion.main
          variants={variants}
          initial="hidden"
          animate="enter"
          transition={{ type: "linear" }}
        >
          {children}
        </motion.main>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
};
