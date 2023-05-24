import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "ACOINFO",
      description: "SylixOS 开源站点",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
