import { RecipeState } from "@/stores/RecipeState";
import { ComponentChildren, createContext } from "preact";
import { useContext, useMemo } from "preact/hooks";

const RecipeStateContext = createContext(
  new RecipeState({
    dose: 20,
    steps: [
      { time: 30, water: 60 },
      { time: 30, water: 90 },
      { time: 30, water: 100 },
      { time: 30, water: 100 },
    ],
  })
);

export function RecipeStateProvider(props: { children: ComponentChildren }) {
  const value = useMemo(
    () =>
      new RecipeState({
        dose: 20,
        steps: [
          { time: 30, water: 60 },
          { time: 30, water: 90 },
          { time: 30, water: 100 },
          { time: 30, water: 100 },
        ],
      }),
    []
  );

  return RecipeStateContext.Provider({ value, ...props });
}

export function useRecipeStateContext() {
  const context = useContext(RecipeStateContext);

  if (!context) {
    throw new Error("Context not found: RecipeStateContext");
  }

  return context;
}
