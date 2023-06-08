import { createEffect, onCleanup } from "solid-js";
import { isDefined, isFunction } from "../utils/helpers";

function useEffect(callback) {
  createEffect(() => {
    if (isDefined(callback) && isFunction(callback)) {
      const cleanup = callback();
      if (isFunction(cleanup)) {
        onCleanup(() => cleanup());
      }
    }
    return;
  });
}

export default useEffect;
