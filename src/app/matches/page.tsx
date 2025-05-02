import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getMatches } from "@/lib/data";
import type { Match } from '@/lib/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge'; // Import Badge

export default async function MatchesPage() {
  const matches: Match[] = await getMatches();

  // Group matches by date
  const matchesByDate = matches.reduce((acc, match) => {
    const dateString = format(match.date, 'yyyy-MM-dd');
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  const sortedDates = Object.keys(matchesByDate).sort();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Match Calendar</h1>

      {sortedDates.length === 0 && (
        <p className="text-muted-foreground">No matches found.</p>
      )}

      {sortedDates.map((dateString) => (
        <div key={dateString} className="space-y-4">
           <h2 className="text-xl font-semibold sticky top-14 bg-background py-2 z-10">
             {format(new Date(dateString + 'T00:00:00'), 'EEEE, PPP')} {/* Display full date */}
           </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchesByDate[dateString].map((match) => (
              <Card key={match.id} className="overflow-hidden">
                 <CardHeader className="p-4 bg-secondary/30 border-b">
                   <CardDescription className="flex justify-between items-center text-sm">
                     <span>{format(match.date, 'p')}</span> {/* Time */}
                     <Badge variant={match.status === 'finished' ? 'secondary' : 'outline'}>
                       {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                     </Badge>
                   </CardDescription>
                 </CardHeader>
                <CardContent className="p-4 flex items-center justify-around text-center">
                  <Link href={`/teams/${match.homeTeam.id}`} className="flex-1 flex flex-col items-center gap-2 hover:opacity-80 transition-opacity px-2">
                     <Image
                       src={match.homeTeam.logoUrl}
                       alt={`${match.homeTeam.name} logo`}
                       width={50}
                       height={50}
                       className="rounded-full object-cover"
                       data-ai-hint="basketball team logo small"
                     />
                    <span className="font-medium text-sm sm:text-base truncate w-full">{match.homeTeam.name}</span>
                    {match.status === 'finished' && (
                      <span className={`text-2xl font-bold ${match.homeScore !== undefined && match.awayScore !== undefined && match.homeScore > match.awayScore ? 'text-primary' : ''}`}>
                        {match.homeScore ?? '-'}
                      </span>
                    )}
                   </Link>

                  <span className="font-bold text-muted-foreground mx-1">VS</span>

                  <Link href={`/teams/${match.awayTeam.id}`} className="flex-1 flex flex-col items-center gap-2 hover:opacity-80 transition-opacity px-2">
                     <Image
                       src={match.awayTeam.logoUrl}
                       alt={`${match.awayTeam.name} logo`}
                       width={50}
                       height={50}
                       className="rounded-full object-cover"
                        data-ai-hint="basketball team logo small"
                     />
                    <span className="font-medium text-sm sm:text-base truncate w-full">{match.awayTeam.name}</span>
                     {match.status === 'finished' && (
                      <span className={`text-2xl font-bold ${match.homeScore !== undefined && match.awayScore !== undefined && match.awayScore > match.homeScore ? 'text-primary' : ''}`}>
                        {match.awayScore ?? '-'}
                       </span>
                    )}
                   </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
