import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel/serverless";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [db(), tailwind(), preact(), auth()],
  adapter: vercel()
});