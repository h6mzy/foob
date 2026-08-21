import { clubsMap, matches, players } from '../../demo/data/index.js';
import { getFirstEleven, getNextMatch, getRemainingPlayers } from '../index.js';

export function getClubPageData(abbr) {
  const club = clubsMap.get(abbr);
  const clubPlayers = players.filter(p => p.clubAbbr === abbr);
  const clubMatches = matches.filter(m => m.home === abbr || m.away === abbr);
  const nextMatch = getNextMatch(clubMatches);
  const enrichedNextMatch = nextMatch ? enrichMatch(nextMatch) : null;
  const nature = abbr === nextMatch.home ? 'home' : 'away';
  const firstEleven = getFirstEleven(clubPlayers, enrichedNextMatch[nature]);
  const remainingPlayers = getRemainingPlayers(clubPlayers, firstEleven);
  
  return {
    club,
    nextMatch: enrichedNextMatch,
    firstEleven,
    remainingPlayers
  };
}

function enrichMatch(match) {
  const { homeData, awayData, ...rest } = match;

  return {
    ...rest,
    home: {
      ...homeData,
      ...clubsMap.get(match.home),
      abbr: match.home
    },
    away: {
      ...awayData,
      ...clubsMap.get(match.away),
      abbr: match.away
    }
  };
}
