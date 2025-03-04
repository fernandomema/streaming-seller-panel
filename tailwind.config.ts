import type { Config } from "tailwindcss";
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons"

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {}
  },

  plugins: [require("@tailwindcss/typography"), iconsPlugin({
    // Select the icon collections you want to use
    // You can also ignore this option to automatically discover all individual icon packages you have installed
    // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
    collections: getIconCollections(["tabler"]),
    // If you want to use all icons from @iconify/json, you can do this:
    // collections: getIconCollections("all"),
    // and the more recommended way is to use `dynamicIconsPlugin`, see below.
  }),]
} as Config;
