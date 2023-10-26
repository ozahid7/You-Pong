import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "300px",
                xxs: "200px",
                fold: "290px",
                s: "360px",
                h: "465px",
            },
            colors: {
                palette: {
                    green: "#537073",
                    orange: "#EB6440",
                    white: "F0F5F5",
                    grey: "#D9E4E5",
                },
                placeh: "#A0A0A0",
            },
            fontFamily: {
                body: ["Chakra Petch"],
            },
            backgroundImage: {
                background: "url('/background.png')",
            },
        },
    },
    plugins: [],
};
export default config;
