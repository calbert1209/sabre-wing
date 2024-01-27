import { useRecipeStateContext } from "@/providers/RecipeStateProvider";
import { ButtonOnClickHandler } from "@/types";
import { useCallback, useEffect, useMemo } from "preact/hooks";
import { Pacer, PacerStep } from "./pacer";
import { useComputed } from "@preact/signals";
import { VolumeDisplay } from "@/components/VolumeDisplay";
import { TimeDisplay } from "@/components/TimeDisplay";
import { useAppState } from "@/providers/AppStateProvider";
import "./pour.css";
import { Pause, Play, Reset, Tune } from "@/assets/SvgIcons";

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

  const handleTogglePlay = useCallback<ButtonOnClickHandler>(() => {
    pacer.togglePlay();
  }, []);

  const handleOnReset = useCallback<ButtonOnClickHandler>(() => {
    pacer.reset();
  }, []);

  const PlayControlIcon = pacer.running.value ? Pause : Play;

  return (
    <section>
      <header className="pour__header">
        <button className="pour__tune-button" onClick={handleOnClickSettings}>
          <Tune className="tune-button__icon" />
        </button>
      </header>
      <VolumeDisplay
        totalVolume={pacer.totalVolume.value}
        start={pacer.volumeStart.value}
        end={pacer.volumeEnd.value}
      />
      <TimeDisplay
        sec={pacer.totalTime.value}
        running={pacer.running.value}
        size="primary"
      />
      <footer className="pour__footer">
        <button
          className="play-control-action-button"
          onClick={handleTogglePlay}
        >
          <PlayControlIcon className="play-control-button__icon" />
        </button>
        <button className="pour__reset-button" onClick={handleOnReset}>
          <Reset className="pour__reset-button__icon" />
        </button>
      </footer>
    </section>
  );
}
