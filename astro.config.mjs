import * as dotenv from 'dotenv'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'

dotenv.config()

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind()],
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
  },
})
