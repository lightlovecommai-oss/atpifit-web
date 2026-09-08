/* 把 sitemap 上的網址一次丟給 IndexNow（Bing／Yandex／Naver 吃這個，Google 不吃）。
   Google 只能走 Search Console，沒有 API 可以自己送。
   用法：node scripts/indexnow.mjs   （網站要先部署好，這支讀的是線上的 sitemap） */

const HOST = 'atpifit.com';
const KEY = 'cf50ca44b123457aa7296ee35693b62f';

const xml = await fetch(`https://${HOST}/sitemap-0.xml`).then(r => r.text());
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

if (!urlList.length) {
  console.error('sitemap 沒抓到網址，先確認網站部署好了沒');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});

console.log(`送出 ${urlList.length} 筆 → HTTP ${res.status}`);
console.log(res.status === 200 || res.status === 202 ? '✓ 已受理' : await res.text());
