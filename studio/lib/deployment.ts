import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";

export const deploymentOptions = {
  widgets: [vercelWidget()],
  name: "deployment",
  title: "Deployment",
};
