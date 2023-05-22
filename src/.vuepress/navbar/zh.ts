import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "文档中心",
    prefix: "/chips/",
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
    text: "资源下载",
    prefix: "/chips/",
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
]);
