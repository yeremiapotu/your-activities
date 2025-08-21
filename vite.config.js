import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/your-activities/", // <-- ganti dengan nama repository GitHub kamu
});
