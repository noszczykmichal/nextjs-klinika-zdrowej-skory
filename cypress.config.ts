import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "dd5rqx",
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
