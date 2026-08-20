import { clubs, matches, players, getFirstEleven, getNextMatch, getRemainingPlayers } from '../index.js';

export function getClubPageData(abbr) {
  const clubsMap = new Map(clubs.map(c => [c.abbr, c]));
  const club = clubsMap.get(abbr);
  const clubPlayers = players.filter(p => p.clubAbbr === abbr);
  const clubMatches = matches.filter(m => m.home === abbr || m.away === abbr);
  const nextMatch = getNextMatch(clubMatches);
  const nextMatchNature = nextMatch.home === abbr ? 'home' : 'away';
  const nextMatchData = nextMatch[`${nextMatchNature}Data`];
  const firstEleven = getFirstEleven(clubPlayers, nextMatchData);
  const remainingPlayers = getRemainingPlayers(clubPlayers, firstEleven);

  return {
    club,
    players: clubPlayers,
    matches: clubMatches,
    nextMatch,
    nextMatchData,
    firstEleven,
    remainingPlayers
  }
};
