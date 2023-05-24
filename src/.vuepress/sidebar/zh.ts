import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "飞腾 Phytium",
      collapsible: false,
      prefix: "sdk/arm64/phytium/",
      link: "sdk/arm64/phytium/",
      children: "structure",
    },
    {
      text: "瑞芯微 Rockchip",
      collapsible: false,
      prefix: "sdk/arm64/rockchip/",
      link: "sdk/arm64/rockchip/",
      children: "structure",
    },
  ],
  "/kernel": [
    "",
    {
      text: "SylixOS 内核完全注释",
      collapsible: false,
      link: "arch/",
      children: "structure",
    },
  ],
});
