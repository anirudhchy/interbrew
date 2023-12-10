import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Get started",
      href: "/",
      disabled: true,
    },
    {
      title: "Support",
      href: "/",
      disabled: true,
    },
    {
      title: "About Us",
      href: "/",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Questionnaires",
      href: "/dashboard",
    },
    {
      title: "Responses",
      href: "/responses",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ],
};
