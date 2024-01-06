import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { NotFound } from "./pages/_404";
import "./style.css";
import { Settings } from "./pages/Settings/index";
import { RecipeStateProvider } from "./providers/RecipeStateProvider";

export function App() {
  return (
    <LocationProvider>
      <RecipeStateProvider>
        <main>
          <Router>
            <Route path="/" component={Settings} />
            <Route default component={NotFound} />
          </Router>
        </main>
      </RecipeStateProvider>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
