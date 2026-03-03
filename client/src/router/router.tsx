import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        lazy: async () => {
          const mod = await import("../pages/Home");
          return { Component: mod.default };
        },
      },
      {
        path: "projects",
        lazy: async () => {
          const mod = await import("../pages/Projects");
          return { Component: mod.default };
        },
      },
      {
        path: "skills",
        lazy: async () => {
          const mod = await import("../pages/Skills");
          return { Component: mod.default };
        },
      },
      {
        path: "contact",
        lazy: async () => {
          const mod = await import("../pages/Contact");
          return { Component: mod.default };
        },
      },
      {
        path: "admin",
        lazy: async () => {
          const mod = await import("../pages/AdminLogin");
          return { Component: mod.default };
        },
      },
      {
        path: "dashboard",
        lazy: async () => {
          const mod = await import("../pages/Dashboard");
          return { Component: mod.default };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const mod = await import("../pages/NotFound");
          return { Component: mod.default };
        },
      },
    ],
  },
]);
