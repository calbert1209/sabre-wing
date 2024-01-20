import { useRecipeStateContext } from "@/providers/RecipeStateProvider";
import { ButtonOnClickHandler } from "@/types";
import { useCallback, useEffect, useMemo } from "preact/hooks";
import { Pacer, PacerStep } from "./pacer";
import { useComputed } from "@preact/signals";
import { VolumeDisplay } from "@/components/VolumeDisplay";
import { TimeDisplay } from "@/components/TimeDisplay";
import { useAppState } from "@/providers/AppStateProvider";
import "./pour.css";
import { CenterRow } from "@/components/layout";

export function Pour() {
  const appState = useAppState();

  const recipe = useRecipeStateContext();

  const pacerSteps = useComputed(() => {
    return recipe.steps.signal.value.map(
      ({ time, water }) => new PacerStep(time, water)
    );
  });
  const pacer = useMemo(() => {
    return new Pacer(pacerSteps.value, 100);
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
      <header className="pour__header">
        <button className="pour__action-button" onClick={handleOnClickSettings}>
          Settings
        </button>
      </header>
      <CenterRow>
        <VolumeDisplay
          totalVolume={pacer.totalVolume.value}
          start={pacer.volumeStart.value}
          end={pacer.volumeEnd.value}
        />
      </CenterRow>
      <CenterRow>
        <TimeDisplay
          sec={pacer.stepTimeRemaining.value}
          stepTime={pacer.totalTime.value}
          running={pacer.running.value}
        />
      </CenterRow>
      <footer className="pour__footer">
        <button className="pour__action-button" onClick={handleOnStart}>
          Start
        </button>
        <button className="pour__action-button" onClick={handleOnPause}>
          Pause
        </button>
        <button className="pour__action-button" onClick={handleOnReset}>
          Reset
        </button>
      </footer>
    </section>
  );
}
