import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: `${SITE.name}｜文章`,
    description: '把影響力當肌肉練，方法、現場，以及可以馬上用的一個小動作。',
    site: context.site ?? SITE.url,
    customData: '<language>zh-Hant-TW</language>',
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      categories: [p.data.category, ...p.data.tags],
      link: `/articles/${p.id}/`,
    })),
  });
}
