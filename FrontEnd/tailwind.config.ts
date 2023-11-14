import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                marquee: "marquee 8s linear infinite",
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
            },
            backgroundImage: {
                background: "url('/background.png')",
                circle: "url('/wave.svg')",
                profile: "url('/ozahid-.jpeg')",
            },
        },
    },
    plugins: [],
};
export default config;
