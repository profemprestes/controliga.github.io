import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { getStandings } from "@/lib/data";
import type { Standing } from '@/lib/types';

export default async function StandingsPage() {
  const standings: Standing[] = await getStandings();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">League Standings</h1>
      <Card>
        <CardContent className="p-0"> {/* Remove CardContent padding for full-width table */}
          <Table>
            <TableCaption className="mt-4">League Standings as of Today</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">Pos</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">P</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center hidden md:table-cell">PF</TableHead>
                <TableHead className="text-center hidden md:table-cell">PA</TableHead>
                <TableHead className="text-center hidden sm:table-cell">Diff</TableHead>
                <TableHead className="text-center font-semibold">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((standing) => (
                <TableRow key={standing.team.id}>
                  <TableCell className="font-medium text-center">{standing.position}</TableCell>
                  <TableCell>
                    <Link href={`/teams/${standing.team.id}`} className="flex items-center gap-3 hover:underline">
                      <Image
                        src={standing.team.logoUrl}
                        alt={`${standing.team.name} logo`}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                        data-ai-hint="basketball team logo small"
                      />
                      <span className="font-medium">{standing.team.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">{standing.played}</TableCell>
                  <TableCell className="text-center">{standing.wins}</TableCell>
                  <TableCell className="text-center">{standing.losses}</TableCell>
                  <TableCell className="text-center hidden md:table-cell">{standing.pointsFor}</TableCell>
                  <TableCell className="text-center hidden md:table-cell">{standing.pointsAgainst}</TableCell>
                  <TableCell className={`text-center hidden sm:table-cell ${standing.pointDifference > 0 ? 'text-green-600' : standing.pointDifference < 0 ? 'text-red-600' : ''}`}>
                     {standing.pointDifference > 0 ? `+${standing.pointDifference}` : standing.pointDifference}
                   </TableCell>
                  <TableCell className="text-center font-semibold">{standing.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
