import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://atpifit.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
