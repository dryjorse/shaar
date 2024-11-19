import { Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
import "./i18n";

function App() {
  return (
    <div className="overflow-hidden">
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
