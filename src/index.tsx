import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { NotFound } from "./pages/_404";
import "./style.css";
import { Settings } from "./pages/Settings/index";
import { RecipeStateProvider } from "./providers/RecipeStateProvider";
import { Routes } from "./constants/routes";

function Pour() {
  return (
    <section>
      <h1>Let's pour coffee!</h1>
    </section>
  );
}

export function App() {
  return (
    <LocationProvider>
      <RecipeStateProvider>
        <main>
          <Router>
            <Route path={Routes.pour} component={Pour} />
            <Route path={Routes.root} component={Settings} />
            <Route default component={NotFound} />
          </Router>
        </main>
      </RecipeStateProvider>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
