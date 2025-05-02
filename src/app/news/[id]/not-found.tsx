import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileX2 } from 'lucide-react';

export default function NewsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center h-[calc(100vh-200px)]">
        <FileX2 className="h-16 w-16 text-destructive" />
        <h2 className="text-2xl font-semibold">News Article Not Found</h2>
        <p className="text-muted-foreground">Sorry, we couldn't find the news article you were looking for.</p>
        <Button asChild>
            <Link href="/news">View All News</Link>
        </Button>
    </div>
  )
}
