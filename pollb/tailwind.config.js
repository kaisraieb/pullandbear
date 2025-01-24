/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "woman-img": "url('/woman.jpg')",
        "man-img": "url('/man.jpg')",
        "nouv-img": "url('/NEWIN-H (1).webp')",
        "homme-two-one": "url('/DENIM-H.webp')",
        "homme-two-two": "url('/SUDADERA-H.webp')",
        "fondo-one": "url('/fondo_11.webp')",
        "femme-nouv-img": "url('/NEWIN-H.webp')",
        "femme-two-img": "url('/Prendaext-H.webp')",
      },
      colors: {
        customGray: "#F0F1F1",
        linkColor: "#bbbbbb",
      },
    },
  },
  plugins: [],
};
