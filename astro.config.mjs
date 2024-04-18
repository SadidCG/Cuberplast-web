import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [db(), tailwind(), preact()],
  adapter: vercel()
});