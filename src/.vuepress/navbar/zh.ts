import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "SDK",
    prefix: "/sdk/",
    children: [
      {
        text: "arm64",
        prefix: "arm64/",
        children: [
          { 
            text: "rockchip", 
            prefix: "rockchip/",
            link: "rockchip/",
          },
        ],
      }
    ],
  },
  {
    text: "BSP 开发",
    prefix: "/bsp/",
    children: [
    ],
  },
  {
    text: "内核详解",
    prefix: "/kernel/",
    children: [
    ],
  },
]);
