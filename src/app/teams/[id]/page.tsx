import Image from 'next/image';
import { getTeamById, getPlayersByTeamId } from "@/lib/data";
import type { Team, Player } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from 'lucide-react';
import { notFound } from 'next/navigation';

interface TeamDetailPageProps {
  params: { id: string };
}

export default async function TeamDetailPage({ params }: TeamDetailPageProps) {
  const team: Team | undefined = await getTeamById(params.id);

  if (!team) {
    notFound(); // Show 404 if team not found
  }

  const players: Player[] = await getPlayersByTeamId(params.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Image
          src={team.logoUrl}
          alt={`${team.name} logo`}
          width={120}
          height={120}
          className="rounded-full object-cover border-4 border-primary shadow-md"
          data-ai-hint="basketball team logo large"
        />
        <h1 className="text-4xl font-bold tracking-tight text-center sm:text-left">{team.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Players</CardTitle>
        </CardHeader>
        <CardContent>
          {players.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {players.map((player) => (
                <li key={player.id} className="flex items-center gap-3 p-3 border rounded-md bg-secondary/50">
                  <Avatar>
                     {/* Assuming no player images for now, using fallback */}
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{player.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No players listed for this team yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Optional: Add sections for Team Stats, History, etc. later */}
      {/*
      <Card>
        <CardHeader><CardTitle>Team Stats</CardTitle></CardHeader>
        <CardContent>...</CardContent>
      </Card>
      */}
    </div>
  );
}

// Optional: Generate static paths if the number of teams is known and relatively small
// export async function generateStaticParams() {
//   const teams = await getTeams();
//   return teams.map((team) => ({
//     id: team.id,
//   }));
// }
