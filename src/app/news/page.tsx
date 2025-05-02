import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getNewsHighlights } from "@/lib/data";
import type { NewsHighlight } from '@/lib/types';
import { format } from 'date-fns';

export default async function NewsPage() {
  const newsItems: NewsHighlight[] = await getNewsHighlights();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">News & Highlights</h1>

      {newsItems.length === 0 && (
        <p className="text-muted-foreground">No news available yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news) => (
           <Link href={`/news/${news.id}`} key={news.id} className="group block">
            <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col overflow-hidden">
                 <div className="relative h-48 w-full">
                   <Image
                     src={news.imageUrl}
                     alt={news.title}
                     layout="fill"
                     objectFit="cover"
                     className="transition-transform group-hover:scale-105"
                     data-ai-hint="basketball action photo news"
                   />
                 </div>
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-lg group-hover:text-primary">{news.title}</CardTitle>
                 <CardDescription>{format(news.date, 'PPP')}</CardDescription>
              </CardHeader>
               <CardContent className="flex-grow">
                 <p className="text-sm text-muted-foreground line-clamp-3">{news.summary}</p>
               </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
