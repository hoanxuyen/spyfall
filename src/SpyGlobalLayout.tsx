import { Outlet } from "react-router-dom";
import SpyTitle from "./components/SpyTitle";
import ThemeToggle from "./components/ThemeToggle";

export default function SpyGlobalLayout() {
  return (
    <>
      <ThemeToggle />
      <div className="p-12 h-full flex flex-col">
        <SpyTitle />
        <div className="basis-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
