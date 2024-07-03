import { Outlet } from "react-router-dom";
import SpyTitle from "./components/SpyTitle";

export default function SpyGlobalLayout() {
  return (
    <div className="p-12 h-screen flex flex-col">
      <SpyTitle />
      <div className="basis-full">
        <Outlet />
      </div>
    </div>
  );
}
