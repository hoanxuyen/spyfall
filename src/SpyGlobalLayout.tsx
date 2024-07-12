import { Outlet } from "react-router-dom";
import SpyTitle from "./components/SpyTitle";
import LightDarkSwitchBtn from "./components/LightDarkSwitchBtn";

export default function SpyGlobalLayout() {
  return (
    <div className="p-12 h-screen flex flex-col text-[#213547] bg-white dark:text-white dark:bg-[#242424] dark:prose-headings:text-white transition-colors">
      <LightDarkSwitchBtn />
      <SpyTitle />
      <div className="basis-full">
        <Outlet />
      </div>
    </div>
  );
}
