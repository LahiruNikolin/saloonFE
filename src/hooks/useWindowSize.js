import { createSignal, createEffect, createRenderEffect } from "solid-js";
import useEffect from "./useEffect";

function useWindowSize() {
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);

  const handler = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  });

  createRenderEffect(() => {
    handler();
  });

  return { width, height };
}

export default useWindowSize;
