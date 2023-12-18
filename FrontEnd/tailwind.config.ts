import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 8s linear infinite",
        marquee2: "marquee 1s linear infinite",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },

          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },

          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },

          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
      screens: {
        xs: "300px",
        xxs: "200px",
        fold: "290px",
        s: "360px",
        h: "465px",
        xxxl: "1736px",
        // Abderrachid's sizes
        sm_: "480px",
        md_: "640px",
        lg_: "992px",
        xl_: "1024px",
        "2xl_": "1280px",
        "3xl_": "1440px",
      },
      colors: {
        palette: {
          green: "#497174",
          orange: "#EB6440",
          white: "#F0F5F5",
          grey: "#D9E4E5",
        },
        placeholdercolor: "#A0A0A0",
        orangeborder: "#D46345",
        greenborder: "#46686A",
        cardtitle: "#616161",
      },
      fontFamily: {
        body: ["Chakra Petch"],
        audio: ["Audiowide"],
        nunito: ["Nunito"],
        roboto: ["Roboto"],
        teko: ["Teko"],
        black: ["Black Han Sans"],
        orbitron: ["Orbitron"],
        russo: ["Russo One"],
        arimo: ["Arimo"],
        archivo: ["Archivo"],
        esteban: ["Esteban"],
        number: ["Black Ops One"],
      },
      backgroundImage: {
        background: "url('/background.png')",
        profile: "url('/ozahid-.jpeg')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
    require("daisyui"),
    nextui(),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
export default config;
