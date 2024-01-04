import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { NotFound } from "./pages/_404";
import "./style.css";
import { Settings } from "./pages/Settings/index";

export function App() {
  return (
    <LocationProvider>
      <main>
        <Router>
          <Route path="/" component={Settings} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
