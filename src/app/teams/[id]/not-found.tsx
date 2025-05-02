import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function TeamNotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center h-[calc(100vh-200px)]">
        <AlertTriangle className="h-16 w-16 text-destructive" />
        <h2 className="text-2xl font-semibold">Team Not Found</h2>
        <p className="text-muted-foreground">Sorry, we couldn't find the team you were looking for.</p>
        <Button asChild>
            <Link href="/teams">View All Teams</Link>
        </Button>
    </div>
  )
}
