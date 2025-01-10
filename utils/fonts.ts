import localFont from "next/font/local";

export const chillax = localFont({
  src: [
    {
      path: "../assets/fonts/Chillax-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../assets/fonts/Chillax-Medium.woff2",
      style: "medium",
      weight: "500",
    },
    {
      path: "../assets/fonts/Chillax-Semibold.woff2",
      style: "semibold",
      weight: "600",
    },
  ],
});

export const generalSans = localFont({
  src: [
    {
      path: "../assets/fonts/GeneralSans-Light.woff2",
      style: "light",
      weight: "300",
    },
    {
      path: "../assets/fonts/GeneralSans-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../assets/fonts/GeneralSans-Medium.woff2",
      style: "medium",
      weight: "500",
    },
    {
      path: "../assets/fonts/GeneralSans-Semibold.woff2",
      style: "semibold",
      weight: "600",
    },
  ],
});
