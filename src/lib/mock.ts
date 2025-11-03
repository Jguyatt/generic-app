// All mock data is initialized in store.ts
// This file can be used for additional seed data or helper functions

export const mockGames = [
  { id: 'g1', league: 'NHL', home: 'Leafs', away: 'Canadiens', time: '7:00 PM' },
  { id: 'g2', league: 'NBA', home: 'Raptors', away: 'Celtics', time: '7:30 PM' },
  { id: 'g3', league: 'NFL', home: 'Bills', away: 'Dolphins', time: '8:00 PM' },
  { id: 'g4', league: 'NHL', home: 'Oilers', away: 'Flames', time: '9:00 PM' },
  { id: 'g5', league: 'NBA', home: 'Lakers', away: 'Clippers', time: '10:00 PM' },
]

export const mockMarkets = [
  { id: 'm1', type: 'Moneyline', abbr: 'ML' },
  { id: 'm2', type: 'Spread', abbr: 'Spread' },
  { id: 'm3', type: 'Total', abbr: 'O/U' },
]

