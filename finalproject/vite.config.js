// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Add this base configuration
  base: "/",
  // Optional: Configure the build output
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});