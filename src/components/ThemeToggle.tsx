import { useEffect, useState } from "react";
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import SpyToggle from "./form/SpyToggle";
import { themeToggleContainerClass } from "../SpyUlt";

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.theme || "dark"
  );

  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.theme = currentTheme;
  }, [currentTheme]);

  const handleClick = () => {
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
  };
  const themeToggleButtonSize = 12;
  const containerWidth = 48;
  const containerHeight = 24;
  const renderComponent = () => {
    switch (currentTheme) {
      case "dark":
        return (
          <div className={themeToggleContainerClass}>
            <MdDarkMode
              style={{
                height: `${containerHeight}px`,
                width: `${containerHeight}px`,
              }}
            />
            <SpyToggle
              containerWidth={containerWidth}
              containerHeight={containerHeight}
              knobSize={themeToggleButtonSize}
              onChange={handleClick}
              toggled={currentTheme === "dark"}
            />
            <MdOutlineLightMode
              style={{
                height: `${containerHeight}px`,
                width: `${containerHeight}px`,
              }}
            />
          </div>
        );
      case "light":
        return (
          <div className={themeToggleContainerClass}>
            <MdOutlineDarkMode
              style={{
                height: `${containerHeight}px`,
                width: `${containerHeight}px`,
              }}
            />
            <SpyToggle
              containerWidth={containerWidth}
              containerHeight={containerHeight}
              knobSize={themeToggleButtonSize}
              onChange={handleClick}
              toggled={currentTheme === "dark"}
            />
            <MdLightMode
              style={{
                height: `${containerHeight}px`,
                width: `${containerHeight}px`,
              }}
            />
          </div>
        );
    }
  };

  return renderComponent();
}
