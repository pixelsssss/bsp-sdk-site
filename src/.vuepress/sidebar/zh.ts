import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "瑞芯微 Rockchip",
      collapsible: false,
      prefix: "chips/arm64/rockchip/",
      link: "chips/arm64/rockchip/",
      children: "structure",
    },
  ],
  "/chips/arm64/rockchip/firefly/Core-3568J/上手教程": [
    {
      text: "上手教程",
      collapsible: true,
      prefix: "",
      link: "",
      children: "structure",
    },
  ],
  "/chips/arm64/rockchip/firefly/Core-3568J/驱动开发": [
    {
      text: "驱动开发",
      collapsible: true,
      prefix: "",
      link: "",
      children: "structure",
    },
  ],
  "/chips/arm64/rockchip/firefly/Core-3568J/常见问题": [
    {
      text: "常见问题",
      collapsible: true,
      prefix: "",
      link: "",
      children: "structure",
    },
  ],
  "/chips/arm64/rockchip/firefly/Core-3568J/固件升级": [
    {
      text: "固件升级",
      collapsible: true,
      prefix: "",
      link: "",
      children: "structure",
    },
  ],
});
