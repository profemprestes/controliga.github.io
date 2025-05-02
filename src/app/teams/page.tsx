import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTeams } from "@/lib/data";
import type { Team } from '@/lib/types';

export default async function TeamsPage() {
  const teams: Team[] = await getTeams();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">League Teams</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teams.map((team) => (
          <Link key={team.id} href={`/teams/${team.id}`} className="group block">
            <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
              <CardHeader className="items-center text-center p-4">
                 <Image
                   src={team.logoUrl}
                   alt={`${team.name} logo`}
                   width={80}
                   height={80}
                   className="rounded-full object-cover mb-3 group-hover:scale-105 transition-transform"
                    data-ai-hint="basketball team logo"
                 />
                <CardTitle className="text-lg group-hover:text-primary">{team.name}</CardTitle>
              </CardHeader>
              {/* Optional: Add CardContent for brief stats if needed later */}
              {/* <CardContent className="text-center text-sm text-muted-foreground p-4 pt-0">
                Wins: X / Losses: Y
              </CardContent> */}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
