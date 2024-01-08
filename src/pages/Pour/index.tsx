import { Routes } from "@/constants/routes";
import { useRecipeStateContext } from "@/providers/RecipeStateProvider";
import { ButtonOnClickHandler } from "@/types";
import { useLocation } from "preact-iso";
import { useCallback, useEffect, useMemo } from "preact/hooks";
import { Pacer, PacerStep } from "./pacer";
import { useComputed } from "@preact/signals";

export function Pour() {
  const { route } = useLocation();

  const recipe = useRecipeStateContext();

  const pacerSteps = useComputed(() => {
    return recipe.steps.signal.value.map(
      ({ time, water }) => new PacerStep(time, water)
    );
  });
  const pacer = useMemo(() => {
    return new Pacer(pacerSteps.value, 1000);
  }, [pacerSteps.value]);

  useEffect(() => {
    return () => {
      pacer.stop();
    };
  }, []);

  const handleOnClickSettings = useCallback<ButtonOnClickHandler>(
    () => route(Routes.root),
    []
  );

  const handleOnStart = useCallback<ButtonOnClickHandler>(() => {
    pacer.start();
  }, []);
  const handleOnPause = useCallback<ButtonOnClickHandler>(() => {
    pacer.stop();
  }, []);

  const handleOnReset = useCallback<ButtonOnClickHandler>(() => {
    pacer.reset();
  }, []);

  return (
    <section>
      <button onClick={handleOnClickSettings}>Settings</button>
      <h1>Let's pour coffee!</h1>
      <button onClick={handleOnStart}>Start</button>
      <button onClick={handleOnPause}>Pause</button>
      <button onClick={handleOnReset}>Reset</button>
      <p>step: {pacer.stepIndex}</p>
      <p>step time: {pacer.stepCountdown}</p>
      <p>total time: {pacer.totalTime}</p>
      <p>total volume: {Math.floor(pacer.totalVolume.value)}</p>
    </section>
  );
}
