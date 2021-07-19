import { lazy } from "react";

const Rewards = lazy(() => import("./pages/Rewards"));
const Settings = lazy(() => import("./pages/Settings"));
const Widget = lazy(() => import("./pages/Widget"));

const routes = {
  REWARDS: {
    exact: true,
    path: "/",
    component: Rewards,
  },
  WIDGET: {
    exact: false,
    path: "/widget",
    component: Widget,
  },
  SETTINGS: {
    exact: false,
    path: "/settings",
    component: Settings,
  },
};

export default routes;
