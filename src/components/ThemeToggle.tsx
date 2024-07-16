import { useEffect, useState } from "react";
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import SpyToggle from "./form/SpyToggle";
import { themeToggleButtonSize } from "../SpyUlt"; // Adjust the import path as necessary

export default function ThemeToggle() {
  const containerWidth = themeToggleButtonSize * 2;

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

  const renderComponent = () => {
    switch (currentTheme) {
      case "dark":
        return (
          <div className="flex gap-2 absolute top-4 left-4">
            <MdDarkMode
              style={{
                height: `${themeToggleButtonSize}px`,
                width: `${themeToggleButtonSize}px`,
              }}
            />
            <SpyToggle
              containerWidth={containerWidth}
              knobSize={themeToggleButtonSize}
              onChange={handleClick}
              toggled={currentTheme === "dark"}
            />
            <MdOutlineLightMode
              style={{
                height: `${themeToggleButtonSize}px`,
                width: `${themeToggleButtonSize}px`,
              }}
            />
          </div>
        );
      case "light":
        return (
          <div className="flex gap-2 absolute top-4 left-4">
            <MdOutlineDarkMode
              style={{
                height: `${themeToggleButtonSize}px`,
                width: `${themeToggleButtonSize}px`,
              }}
            />
            <SpyToggle
              containerWidth={containerWidth}
              knobSize={themeToggleButtonSize}
              onChange={handleClick}
              toggled={currentTheme === "dark"}
            />
            <MdLightMode
              style={{
                height: `${themeToggleButtonSize}px`,
                width: `${themeToggleButtonSize}px`,
              }}
            />
          </div>
        );
    }
  };

  return renderComponent();
}
