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
import SpyDiscuss from "./components/SpyDiscuss.tsx";
import SpyReveal from "./components/SpyReveal.tsx";
import PageFadeIn from "./components/PageFadeIn.tsx";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <SpyGlobalLayout />,
      children: [
        {
          path: "/",
          element: (
            <PageFadeIn>
              <SpyMainMenu />
            </PageFadeIn>
          ),
        },
        {
          path: "/lobby",
          element: (
            <PageFadeIn>
              <SpyLobby />
            </PageFadeIn>
          ),
        },
        {
          path: "/roles",
          element: (
            <PageFadeIn>
              <SpyAnnounceRole />
            </PageFadeIn>
          ),
        },
        {
          path: "/discuss",
          element: (
            <PageFadeIn>
              <SpyDiscuss />
            </PageFadeIn>
          ),
        },
        {
          path: "/reveal",
          element: (
            <PageFadeIn>
              <SpyReveal />
            </PageFadeIn>
          ),
        },
      ],
    },
  ],
  { basename: "/spyfall" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
