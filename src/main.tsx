import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SpyAnnounceRole from "./components/SpyAnnounceRole.tsx";
import SpyGlobalLayout from "./SpyGlobalLayout.tsx";
import SpyMainMenu from "./components/SpyMainMenu.tsx";
import SpyLobby from "./components/SpyLobby.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SpyGlobalLayout />,
    children: [
      { path: "/", element: <SpyMainMenu /> },
      { path: "lobby", element: <SpyLobby /> },
      { path: "roles", element: <SpyAnnounceRole /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
