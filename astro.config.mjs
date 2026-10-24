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
      /* 複訓報名表只給電話邀請的舊生，頁面自己掛 noindex，sitemap 也不能把它列出去。
         /courses 已退役成一頁轉址，sitemap 不該再推它——sitemap 的意思是「請收錄這頁」，
         推一個會把人彈走的網址等於自打嘴巴。 */
      filter: (page) =>
        !page.includes('/courses/retrain') && !/\/courses\/?$/.test(new URL(page).pathname),
      serialize(item) {
        const date = lastmod(new URL(item.url).pathname);
        if (date) item.lastmod = date;
        return item;
      },
    }),
  ],
  /* /courses 是過渡期的課程頁，2026-10-24 退役——L1–L13 課表、兩個 SKU、上課方式
     全部搬進 /gravity 那一頁長頁。它被 Google 收錄過，也被導覽列指了幾個月，
     所以不是刪掉就算，要留一條轉址把權重與舊書籤帶過去。
     ⚠️ 靜態輸出的轉址是一頁 meta refresh ＋ canonical，不是 301——GitHub Pages
        給不了真正的 301。搬家訊號靠那張頁面上的 canonical。
     ⚠️ /courses/retrain 是另一條路（電話邀請的舊生），獨立路由，不受這條影響。 */
  redirects: { '/courses': '/gravity' },
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
