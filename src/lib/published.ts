// pubDate 還沒到的文章不出現在任何地方（列表／內頁／RSS／sitemap／llms.txt）。
// deploy.yml 的每日 cron 會重建網站，到期當天自動上線——所以可以一次寫好一整季。
export const isPublished = ({ draft, pubDate }: { draft?: boolean; pubDate: Date }) =>
  !draft && pubDate.valueOf() <= Date.now();
