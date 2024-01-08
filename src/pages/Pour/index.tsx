import { Routes } from "@/constants/routes";
import { useRecipeStateContext } from "@/providers/RecipeStateProvider";
import { ButtonOnClickHandler } from "@/types";
import { useLocation } from "preact-iso";
import { useCallback } from "preact/hooks";

export function Pour() {
  const { route } = useLocation();

  const recipe = useRecipeStateContext();

  const handleOnClickSettings = useCallback<ButtonOnClickHandler>(
    () => route(Routes.root),
    []
  );

  const handleOnStart = useCallback<ButtonOnClickHandler>(
    () => console.log("start", recipe),
    []
  );
  const handleOnPause = useCallback<ButtonOnClickHandler>(
    () => console.log("pause", recipe),
    []
  );

  const handleOnReset = useCallback<ButtonOnClickHandler>(
    () => console.log("reset", recipe),
    []
  );

  return (
    <section>
      <button onClick={handleOnClickSettings}>Settings</button>
      <h1>Let's pour coffee!</h1>
      <button onClick={handleOnStart}>Start</button>
      <button onClick={handleOnPause}>Pause</button>
      <button onClick={handleOnReset}>Reset</button>
    </section>
  );
}
