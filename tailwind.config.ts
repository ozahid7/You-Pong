import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#497174",
          secondary: "#EB6440",
          accent: "#FFFFFF",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
  theme: {
    extend: {
      animation: {
        marquee: "marquee 8s linear infinite",
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
      },
      screens: {
        xs: "300px",
        xxs: "200px",
        fold: "290px",
        s: "360px",
        h: "465px",
        // Abderrachid's sizes
        sm: "480px",
        md: "640px",
        lg: "992px",
        xl: "1024px",
        "2xl": "1280px",
        "3xl": "1440px",
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
      },
      fontFamily: {
        body: ["Chakra Petch"],
        audio: ["Audiowide"],
        nunito: ["Nunito"],
        roboto: ["Roboto"],
        teko: ["Teko"],
      },
      backgroundImage: {
        background: "url('/background.png')",
        circle: "url('/wave.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
