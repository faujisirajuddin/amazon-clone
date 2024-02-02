import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screen: {
        xs: "320px",
        sm: "375px",
        sml: "500",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      colors: {
        amazon_blue: "#131921",
        amazon_light: "#232F3E",
        amazon_yellow: "#febd69",
        lightText: "#ccc",
        footerBottom:"#131A22"
      },
      fontFamily:{
        bodyFont:["Poppins","sans-serif"]
      },
      boxShadow:{
        testShadow : "0px 0px 32px 1px rgba(199,199,199,1)",
        amazonInput:"0px 0px 3px 2px rgb(228 121 17 / 50%)"
      }
    },
  },
  plugins: [],
};
export default config;
