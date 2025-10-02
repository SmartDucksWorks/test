import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: Project site base must match repo name with trailing slash
export default defineConfig({
  plugins: [react()],
  base: "/test/",
});
