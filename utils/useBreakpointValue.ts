import { useLayoutEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export const isSSR =
  typeof window === "undefined" ||
  !window.navigator ||
  /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);

export const isBrowser = !isSSR;

export const getBreakpointValue = (value: string): number =>
  parseInt(fullConfig.theme.screens[value].replace("px", ""), 10);

export const getCurrentBreakpoint = (): string => {
  let currentBreakpoint: string;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  return currentBreakpoint;
};

const useBreakpointValue = () => {
  const [value, setValue] = useState<string>(
    isBrowser && "matchMedia" in window
      ? getCurrentBreakpoint() || "mobile"
      : ""
  );

  useLayoutEffect(() => {
    if (!(isBrowser && "matchMedia" in window)) return undefined;

    const track = () => {
      setValue(getCurrentBreakpoint() || "mobile");
    };
    window.addEventListener("resize", track);
    return () => {
      window.removeEventListener("resize", track);
    };
  });

  return value;
};

export default useBreakpointValue;
