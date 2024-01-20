import { useRecipeStateContext } from "@/providers/RecipeStateProvider";
import { ButtonOnClickHandler } from "@/types";
import { useCallback, useEffect, useMemo } from "preact/hooks";
import { Pacer, PacerStep } from "./pacer";
import { useComputed } from "@preact/signals";
import { VolumeDisplay } from "@/components/VolumeDisplay";
import { TimeDisplay } from "@/components/TimeDisplay";
import { useAppState } from "@/providers/AppStateProvider";

export function Pour() {
  const appState = useAppState();

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
    () => appState.setMode("setup"),
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
      <VolumeDisplay
        totalVolume={pacer.totalVolume.value}
        start={pacer.volumeStart.value}
        end={pacer.volumeEnd.value}
      />
      <TimeDisplay
        sec={pacer.stepTimeRemaining.value}
        stepTime={pacer.totalTime.value}
        running={pacer.running.value}
      />
      <button onClick={handleOnStart}>Start</button>
      <button onClick={handleOnPause}>Pause</button>
      <button onClick={handleOnReset}>Reset</button>
    </section>
  );
}
