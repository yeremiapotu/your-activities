import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/daily-activities/", // <-- ganti dengan nama repository GitHub kamu
});
