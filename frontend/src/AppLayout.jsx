// CSS
import "./AppLayout.css";
//IMPORT
import { Outlet } from "react-router-dom";

// FUNCTION
export default function AppLayout() {
  return (
    <>
      <section className="app">
        <section className="app_header">
          <p>Work in progress...</p>
        </section>
        <section className="app_main">
          <Outlet />
        </section>
        <section className="app_footer"></section>
      </section>
    </>
  );
}
