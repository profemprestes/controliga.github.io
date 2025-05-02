import type { Team, Player, Match, Standing, NewsHighlight } from './types';

// Mock Teams
const mockTeams: Team[] = [
  { id: 't1', name: 'Gran Canaria Gladiators', logoUrl: 'https://picsum.photos/seed/t1/100/100' },
  { id: 't2', name: 'Tenerife Titans', logoUrl: 'https://picsum.photos/seed/t2/100/100' },
  { id: 't3', name: 'Lanzarote Lakers', logoUrl: 'https://picsum.photos/seed/t3/100/100' },
  { id: 't4', name: 'Fuerteventura Flyers', logoUrl: 'https://picsum.photos/seed/t4/100/100' },
  { id: 't5', name: 'La Palma Pythons', logoUrl: 'https://picsum.photos/seed/t5/100/100' },
  { id: 't6', name: 'Gomera Giants', logoUrl: 'https://picsum.photos/seed/t6/100/100' },
];

// Mock Players
const mockPlayers: Player[] = [
  { id: 'p1', name: 'Juan Pérez', teamId: 't1' },
  { id: 'p2', name: 'Ana García', teamId: 't1' },
  { id: 'p3', name: 'Carlos Rodríguez', teamId: 't1' },
  { id: 'p4', name: 'Sofía López', teamId: 't2' },
  { id: 'p5', name: 'David Fernández', teamId: 't2' },
  { id: 'p6', name: 'Laura Martínez', teamId: 't2' },
  { id: 'p7', name: 'Javier Gómez', teamId: 't3' },
  { id: 'p8', name: 'Elena Sánchez', teamId: 't3' },
  { id: 'p9', name: 'Daniel Ruiz', teamId: 't3' },
  { id: 'p10', name: 'Isabel Díaz', teamId: 't4' },
  { id: 'p11', name: 'Pedro Moreno', teamId: 't4' },
  { id: 'p12', name: 'Carmen Jiménez', teamId: 't4' },
  { id: 'p13', name: 'Miguel Álvarez', teamId: 't5' },
  { id: 'p14', name: 'Paula Romero', teamId: 't5' },
  { id: 'p15', name: 'Sergio Navarro', teamId: 't5' },
  { id: 'p16', name: 'Lucía Gil', teamId: 't6' },
  { id: 'p17', name: 'Pablo Santos', teamId: 't6' },
  { id: 'p18', name: 'Marta Torres', teamId: 't6' },
];

// Mock Matches
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(today.getDate() - 2);

const mockMatches: Match[] = [
  { id: 'm1', date: twoDaysAgo, homeTeam: mockTeams[0], awayTeam: mockTeams[1], homeScore: 85, awayScore: 80, status: 'finished' },
  { id: 'm2', date: yesterday, homeTeam: mockTeams[2], awayTeam: mockTeams[3], homeScore: 92, awayScore: 88, status: 'finished' },
  { id: 'm3', date: today, homeTeam: mockTeams[4], awayTeam: mockTeams[5], status: 'scheduled' }, // Next Match
  { id: 'm4', date: tomorrow, homeTeam: mockTeams[1], awayTeam: mockTeams[2], status: 'scheduled' },
  { id: 'm5', date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), homeTeam: mockTeams[3], awayTeam: mockTeams[0], status: 'scheduled' },
  { id: 'm6', date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), homeTeam: mockTeams[5], awayTeam: mockTeams[4], status: 'scheduled' },
 ];

// Mock Standings
const mockStandings: Standing[] = mockTeams.map((team, index) => ({
  position: index + 1,
  team: team,
  played: 2,
  wins: index % 2 === 0 ? 2 : 1, // Alternate wins
  losses: index % 2 === 0 ? 0 : 1,
  pointsFor: Math.floor(Math.random() * 50) + 150, // Random points between 150-200
  pointsAgainst: Math.floor(Math.random() * 50) + 140, // Random points between 140-190
  pointDifference: 0, // Calculate later
  points: (index % 2 === 0 ? 2 : 1) * 2, // 2 points per win
})).sort((a, b) => {
  if (b.points !== a.points) return b.points - a.points;
  const diffA = a.pointsFor - a.pointsAgainst;
  const diffB = b.pointsFor - b.pointsAgainst;
  return diffB - diffA; // Sort by point difference if points are equal
}).map((standing, index) => {
    standing.position = index + 1; // Recalculate position after sorting
    standing.pointDifference = standing.pointsFor - standing.pointsAgainst; // Calculate point difference
    return standing;
});


// Mock News/Highlights
const mockNews: NewsHighlight[] = [
  { id: 'n1', title: 'Gladiators Secure Crucial Win', summary: 'Gran Canaria Gladiators pulled off a stunning victory against the Titans...', imageUrl: 'https://picsum.photos/seed/news1/300/200', date: yesterday },
  { id: 'n2', title: 'Lakers vs Flyers: A Nail-Biter Finish', summary: 'The match between Lanzarote Lakers and Fuerteventura Flyers went down to the wire...', imageUrl: 'https://picsum.photos/seed/news2/300/200', date: twoDaysAgo },
  { id: 'n3', title: 'League Heats Up: Mid-Season Analysis', summary: 'Experts weigh in on the current standings and predict the playoff contenders.', imageUrl: 'https://picsum.photos/seed/news3/300/200', date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000) },
];


// Simulate API calls
export const getTeams = async (): Promise<Team[]> => {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  return mockTeams;
};

export const getTeamById = async (id: string): Promise<Team | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockTeams.find(team => team.id === id);
};

export const getPlayersByTeamId = async (teamId: string): Promise<Player[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockPlayers.filter(player => player.teamId === teamId);
};

export const getMatches = async (): Promise<Match[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockMatches.sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort matches by date
};

export const getLatestResult = async (): Promise<Match | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const finishedMatches = mockMatches
        .filter(match => match.status === 'finished')
        .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort finished matches descending by date
    return finishedMatches[0];
};

export const getNextMatch = async (): Promise<Match | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const scheduledMatches = mockMatches
        .filter(match => match.status === 'scheduled' && match.date >= today)
        .sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort scheduled matches ascending by date
    return scheduledMatches[0];
};


export const getStandings = async (): Promise<Standing[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockStandings;
};

export const getNewsHighlights = async (): Promise<NewsHighlight[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockNews.sort((a,b) => b.date.getTime() - a.date.getTime()); // Sort news descending by date
}
