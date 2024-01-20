import { render } from "preact";

import "./style.css";
import { Settings } from "./pages/Settings/index";
import { RecipeStateProvider } from "./providers/RecipeStateProvider";
import { Pour } from "./pages/Pour";
import { AppStateProvider, useAppState } from "./providers/AppStateProvider";

function PageRouter() {
  const appState = useAppState();

  return appState.mode.value === "pour" ? <Pour /> : <Settings />;
}

export function App() {
  return (
    <AppStateProvider>
      <RecipeStateProvider>
        <main>
          <PageRouter />
        </main>
      </RecipeStateProvider>
    </AppStateProvider>
  );
}

render(<App />, document.getElementById("app"));
