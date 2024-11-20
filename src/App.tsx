import { Route, Routes } from "react-router-dom";
import { routes, routes2 } from "./constants/routes";
import "./i18n";
import MainLayout from "./layouts/mainLayout/MainLayout";

function App() {
  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
        {routes2.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
