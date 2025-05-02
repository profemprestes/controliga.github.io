export interface Team {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  // Add other player details as needed, e.g., position, number
}

export interface Match {
  id: string;
  date: Date;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'finished' | 'live'; // Added status
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  pointDifference: number;
  points: number;
}

export interface NewsHighlight {
    id: string;
    title: string;
    summary: string;
    imageUrl: string;
    date: Date;
}
