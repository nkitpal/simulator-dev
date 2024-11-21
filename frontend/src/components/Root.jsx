import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";
export default function Root() {
  return (
    <body>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </body>
  );
}
