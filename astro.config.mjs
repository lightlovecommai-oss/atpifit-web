import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://atpifit.com',
  trailingSlash: 'ignore',
  /* 複訓報名表只給電話邀請的舊生，頁面自己掛 noindex，sitemap 也不能把它列出去。 */
  integrations: [sitemap({ filter: (page) => !page.includes('/courses/retrain') })],
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
