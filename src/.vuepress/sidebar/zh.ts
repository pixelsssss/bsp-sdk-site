import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "飞腾 Phytium",
      collapsible: false,
      prefix: "chips/arm64/phytium/",
      link: "chips/arm64/phytium/",
      children: "structure",
    },
    {
      text: "瑞芯微 Rockchip",
      collapsible: false,
      prefix: "chips/arm64/rockchip/",
      link: "chips/arm64/rockchip/",
      children: "structure",
    },
  ],
});
