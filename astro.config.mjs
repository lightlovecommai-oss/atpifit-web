import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

/* 網址 → 產生它的原始檔。 */
function sourceFile(pathname) {
  const p = pathname.replace(/^\//, '').replace(/\/$/, '');
  if (p === '') return 'src/pages/index.astro';
  const entry = p.match(/^(articles|glossary)\/(.+)$/);
  if (entry) return `src/content/${entry[1]}/${entry[2]}.md`;
  const nested = `src/pages/${p}/index.astro`;
  return existsSync(nested) ? nested : `src/pages/${p}.astro`;
}

/* lastmod 取該檔的 git 最後 commit 時間。
   ⚠️ 不要改成 build 時間——每次部署把全站 lastmod 蓋成今天，
   Google 會判定這個欄位不可信、之後整份都不採用。查不到日期就寧可不寫。
   ⚠️ CI 的 checkout 必須 fetch-depth: 0，淺複製會讓每個檔都回同一個日期。 */
const cache = new Map();
function lastmod(pathname) {
  const file = sourceFile(pathname);
  if (!cache.has(file)) {
    let date;
    try {
      date =
        execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
          encoding: 'utf8',
        }).trim() || undefined;
    } catch {
      date = undefined;
    }
    cache.set(file, date);
  }
  return cache.get(file);
}

export default defineConfig({
  site: 'https://atpifit.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      /* 複訓報名表只給電話邀請的舊生，頁面自己掛 noindex，sitemap 也不能把它列出去。 */
      filter: (page) => !page.includes('/courses/retrain'),
      serialize(item) {
        const date = lastmod(new URL(item.url).pathname);
        if (date) item.lastmod = date;
        return item;
      },
    }),
  ],
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
