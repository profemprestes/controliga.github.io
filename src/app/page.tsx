import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getNextMatch, getLatestResult, getStandings, getNewsHighlights } from "@/lib/data";
import { format } from 'date-fns';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';

export default async function Home() {
  const nextMatch = await getNextMatch();
  const latestResult = await getLatestResult();
  const standings = await getStandings();
  const newsHighlights = await getNewsHighlights();
  const standingsSummary = standings.slice(0, 5); // Show top 5 teams

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Welcome to Canary Ball</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Match Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Next Match
            </CardTitle>
            {nextMatch && (
               <CardDescription>
                {format(nextMatch.date, 'PPP p')} {/* Format date and time */}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {nextMatch ? (
              <div className="flex items-center justify-around text-center">
                 <Link href={`/teams/${nextMatch.homeTeam.id}`} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                   <Image
                     src={nextMatch.homeTeam.logoUrl}
                     alt={`${nextMatch.homeTeam.name} logo`}
                     width={60}
                     height={60}
                     className="rounded-full object-cover"
                     data-ai-hint="basketball team logo"
                   />
                   <span className="font-medium">{nextMatch.homeTeam.name}</span>
                 </Link>
                <span className="text-2xl font-bold text-muted-foreground">VS</span>
                 <Link href={`/teams/${nextMatch.awayTeam.id}`} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                   <Image
                     src={nextMatch.awayTeam.logoUrl}
                     alt={`${nextMatch.awayTeam.name} logo`}
                     width={60}
                     height={60}
                     className="rounded-full object-cover"
                     data-ai-hint="basketball team logo"
                   />
                   <span className="font-medium">{nextMatch.awayTeam.name}</span>
                 </Link>
              </div>
            ) : (
              <p className="text-muted-foreground">No upcoming matches scheduled.</p>
            )}
          </CardContent>
        </Card>

        {/* Latest Result Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-primary">
                 <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.177A7.547 7.547 0 0 1 6.648 6.61a.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
               </svg>
              Latest Result
            </CardTitle>
             {latestResult && (
              <CardDescription>
                {format(latestResult.date, 'PPP')} {/* Format date */}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {latestResult ? (
              <div className="flex items-center justify-around text-center">
                <Link href={`/teams/${latestResult.homeTeam.id}`} className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity">
                   <Image
                     src={latestResult.homeTeam.logoUrl}
                     alt={`${latestResult.homeTeam.name} logo`}
                     width={50}
                     height={50}
                     className="rounded-full object-cover mb-1"
                      data-ai-hint="basketball team logo"
                   />
                  <span className="text-sm font-medium">{latestResult.homeTeam.name}</span>
                  <span className="text-xl font-bold">{latestResult.homeScore}</span>
                 </Link>
                <span className="text-lg font-bold text-muted-foreground">-</span>
                 <Link href={`/teams/${latestResult.awayTeam.id}`} className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity">
                   <Image
                     src={latestResult.awayTeam.logoUrl}
                     alt={`${latestResult.awayTeam.name} logo`}
                     width={50}
                     height={50}
                     className="rounded-full object-cover mb-1"
                      data-ai-hint="basketball team logo"
                   />
                  <span className="text-sm font-medium">{latestResult.awayTeam.name}</span>
                  <span className="text-xl font-bold">{latestResult.awayScore}</span>
                 </Link>
              </div>
            ) : (
              <p className="text-muted-foreground">No results available yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

       {/* Standings Summary Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>League Standings Summary</CardTitle>
            <CardDescription>Top 5 Teams</CardDescription>
          </div>
           <Button asChild variant="outline" size="sm">
              <Link href="/standings">
                View Full Standings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Pos</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center hidden sm:table-cell">P</TableHead>
                <TableHead className="text-center hidden sm:table-cell">W</TableHead>
                <TableHead className="text-center hidden sm:table-cell">L</TableHead>
                <TableHead className="text-right">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standingsSummary.map((standing) => (
                <TableRow key={standing.team.id}>
                  <TableCell className="font-medium">{standing.position}</TableCell>
                  <TableCell>
                    <Link href={`/teams/${standing.team.id}`} className="flex items-center gap-2 hover:underline">
                      <Image
                        src={standing.team.logoUrl}
                        alt={`${standing.team.name} logo`}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                        data-ai-hint="basketball team logo small"
                      />
                      {standing.team.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">{standing.played}</TableCell>
                  <TableCell className="text-center hidden sm:table-cell">{standing.wins}</TableCell>
                  <TableCell className="text-center hidden sm:table-cell">{standing.losses}</TableCell>
                  <TableCell className="text-right font-semibold">{standing.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* News & Highlights Card */}
       <Card>
         <CardHeader className="flex flex-row items-center justify-between">
           <div>
             <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-primary" />
               News & Highlights
             </CardTitle>
             <CardDescription>Latest updates from the league</CardDescription>
           </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/news">
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
         </CardHeader>
         <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {newsHighlights.slice(0, 3).map((news) => ( // Show latest 3 news items
             <Link href={`/news/${news.id}`} key={news.id} className="group block rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
               <div className="relative h-40 w-full">
                 <Image
                   src={news.imageUrl}
                   alt={news.title}
                   layout="fill"
                   objectFit="cover"
                   className="transition-transform group-hover:scale-105"
                    data-ai-hint="basketball action photo"
                 />
               </div>
               <div className="p-4">
                 <h3 className="font-semibold mb-1 group-hover:text-primary">{news.title}</h3>
                 <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{news.summary}</p>
                 <p className="text-xs text-muted-foreground">{format(news.date, 'PPP')}</p>
               </div>
             </Link>
           ))}
         </CardContent>
       </Card>
    </div>
  );
}
