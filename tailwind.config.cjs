/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        max: 999999,
      },
      boxShadow: {
        input: "0 0 0 1px rgba(0, 0, 0, 0.3)",
      },
      transitionProperty: {
        "max-height": "max-height",
      },
      spacing: {
        960: "240rem",
      },
      colors: {
        primary: {
          ...colors.blue,
          DEFAULT: colors.blue["700"],
        },
        secondary: {
          ...colors.gray,
          DEFAULT: colors.gray["600"],
        },
        warning: {
          ...colors.yellow,
          DEFAULT: colors.yellow["500"],
        },
        danger: {
          ...colors.red,
          DEFAULT: colors.red["600"],
        },
        success: {
          ...colors.green,
          DEFAULT: colors.green["600"],
        },
        info: {
          ...colors.cyan,
          DEFAULT: colors.cyan["600"],
        },
        primary_theme: {
          DEFAULT: "#183153",
          hv: "#11233b",
          tx: "white",
        },
        secondary_theme: {
          DEFAULT: "#09815b",
          hv: "#06543b",
          tx: "white",
        },
        tertiary_theme: {
          DEFAULT: "#124592",
          hv: "#0a2956",
          tx: "white",
        },
        quaternary_theme: {
          DEFAULT: colors.cyan["700"],
          hv: colors.cyan["800"],
          tx: "white",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "min-max-w": (value) => ({
            "min-width": value,
            "max-width": value,
          }),
          "column-w": (value) => ({
            flex: "none !important",
            width: value,
          }),
        },
        { values: theme("spacing") }
      );
    }),
  ],
  safelist: [
    {
      pattern:
        /(bg|text)-(primary_theme|secondary_theme|tertiary_theme|quaternary_theme|primary|secondary|success|info|danger|warning)/,
      variants: ["hover", "group-hover"],
    },
    {
      pattern:
        /(bg|text)-(primary_theme|secondary_theme|tertiary_theme|quaternary_theme)-(hv|tx)/,
      variants: ["hover", "group-hover"],
    },
    {
      pattern: /text-[a-z]+-[0-9]+/,
    },
    {
      pattern: /p[a-z]-[0-9]+/,
    },
    {
      pattern: /basis-[0-9]+\/12/,
      variants: ["sm", "md", "lg", "xl", "2xl"],
    },
  ],
};
