// IMPORT
import {
  Link,
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

// COMPONENTS
import AppLayout from "./AppLayout";
import TownWeather from "./components/TownWeather/TownWeather";

// CSS
import "./App.css";

// IMAGES

// FUNCTION
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<TownWeather />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
