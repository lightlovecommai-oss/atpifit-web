import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* 四塊影響力肌肉。維度代號用來上色與交叉連結。 */
const dim = z.enum(['A', 'T', 'P', 'I']);

/* ── SEO 文章 ──
   新增一篇＝在 src/content/articles/ 丟一個 .md，列表頁／sitemap／RSS 自動吃到。 */
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /* description 直接當 <meta description> 與列表摘要。150 字以內，要寫得像答案。 */
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /* 主題分類，用於列表篩選與麵包屑 */
    category: z.enum(['方法論', '溝通現場', '品牌詞', '影響力健身房']),
    /* 這篇主要練哪塊肌肉。沒有就不填。 */
    dim: dim.optional(),
    tags: z.array(z.string()).default([]),
    /* 這篇要導向哪個轉換。決定文末 CTA 元件。 */
    cta: z.enum(['quiz', 'subscribe', 'course']).default('quiz'),
    /* AI 搜尋用：文章裡直接可被引用的 Q&A，會輸出成 FAQPage 結構化資料 */
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/* ── 名詞頁 ──
   餵 Google 與 AI 搜尋的定義頁。每頁輸出 DefinedTerm 結構化資料。
   ⚠️ 定義句一律以 productkit 01-核心定義字典 為準，不得自行改寫。 */
const glossary = defineCollection({
  loader: glob({ base: './src/content/glossary', pattern: '**/*.md' }),
  schema: z.object({
    term: z.string(),
    /* 可被直接引用的一句話定義。放在頁面第一段，也放 meta description。 */
    definition: z.string(),
    /* 別名／英文名，餵 schema 的 alternateName */
    aliases: z.array(z.string()).default([]),
    order: z.number().default(99),
    dim: dim.optional(),
    /* 字典出處，供內部回溯。不對外顯示。 */
    source: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

/* ── Landing page ──
   廣告落地頁。跟文章分開，因為它 noindex 與版型都不一樣。 */
const lp = defineCollection({
  loader: glob({ base: './src/content/lp', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /* 廣告頁預設不進 sitemap、不給搜尋引擎索引，避免跟正式頁互相稀釋 */
    noindex: z.boolean().default(true),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, glossary, lp };
