import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

const [loader, setLoader] = createSignal(false);
const [appState, setAppState] = createStore({});

export const useAppState = () => [appState, setAppState];
export const useLoader = () => [loader, setLoader];
