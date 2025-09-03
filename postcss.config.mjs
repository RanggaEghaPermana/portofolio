// FILE: postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    // Turunkan lab()/oklab()/oklch() ke sRGB agar Lightning CSS & Turbopack aman
    "postcss-preset-env": {
      stage: 3,
      features: {
        "lab-function": true,
        "oklab-function": true,
        "oklch-function": true
      },
      preserve: false
    }
  }
};
