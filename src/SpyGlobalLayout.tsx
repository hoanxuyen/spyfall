import { Outlet } from "react-router-dom";
import SpyTitle from "./components/SpyTitle";
import ThemeToggle from "./components/ThemeToggle";

export default function SpyGlobalLayout() {
  return (
    <>
      <ThemeToggle />
      {/** Toggle 32px + 16px padding */}
      <div
        className="p-4 h-full min-h-screen flex flex-col container mx-auto prose-h1:mt-12"
      >
        <SpyTitle />
        <Outlet />
      </div>
    </>
  );
}
