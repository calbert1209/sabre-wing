import { ReadonlySignal, Signal, computed, signal } from "@preact/signals";
import { createContext } from "preact";
import { PropsWithChildren, useContext, useMemo } from "preact/compat";

type AppMode = "setup" | "pour";

export class AppState {
  private _mode: Signal<AppMode> = signal("setup");

  public get mode(): ReadonlySignal<AppMode> {
    return computed(() => this._mode.value);
  }

  public setMode(value: AppMode) {
    this._mode.value = value;
  }
}

const AppStateContext = createContext(new AppState());

export function AppStateProvider(props: PropsWithChildren<{}>) {
  const appState = useMemo(() => new AppState(), []);
  return AppStateContext.Provider({ value: appState, ...props });
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("Context not found: AppStateContext");
  }

  return context;
}
