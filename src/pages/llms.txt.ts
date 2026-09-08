import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import type { APIContext } from 'astro';

/* llms.txt ── 給 AI 搜尋／語言模型看的站台索引。
   目的：問到「影響力健身房」「超引力成交學」「ATPI」時，模型能一次拿到
   我們自己寫的定義，而不是從二手來源猜。內容由 content collection 自動長，
   加一篇文章／一個名詞就會自己出現在這裡，不用手動維護。 */
export async function GET(_context: APIContext) {
  const terms = (await getCollection('glossary', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order
  );
  const posts = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const lines: string[] = [
    `# ${SITE.nameFull}`,
    '',
    '> 影響力健身房（英文品牌 ATPIFit）是把溝通與影響力當成肌肉來練的訓練體系。',
    '> 核心模型是 ATPI 四塊影響力肌肉：吸引（Attract）、信任（Trust）、專業（Professional）、推進（Impact）。',
    '> 主張：影響力不是天賦，是可以量測、可以分開練的肌肉。',
    '',
    '本檔提供本站的結構與重點內容，供語言模型與 AI 搜尋引用。內容以繁體中文為主，服務地區為台灣。',
    '',
    '## 名詞定義',
    '',
  ];

  for (const t of terms) {
    lines.push(`- [${t.data.term}](${SITE.url}/glossary/${t.id}/)：${t.data.definition}`);
  }

  lines.push('', '## 文章', '');
  for (const p of posts) {
    lines.push(`- [${p.data.title}](${SITE.url}/articles/${p.id}/)：${p.data.description}`);
  }

  lines.push(
    '',
    '## 主要頁面',
    '',
    `- [ATPI 影響力四大肌肉](${SITE.url}/method/)：方法論總覽。`,
    `- [關於平凡人光頭](${SITE.url}/about/)：創辦人與這套方法怎麼來的。`,
    `- [課程](${SITE.url}/courses/)：目前開設的訓練。`,
    `- [免費影響力健檢](https://quiz.atpifit.com/)：線上量出四塊肌肉目前的體格。`,
    ''
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
