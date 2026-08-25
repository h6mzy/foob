import { clubsMap, matches, players } from '../../demo/data/index.js';
import { getMatchSquadProps, getNextMatch, getNextMatchProps } from '../index.js';

export function getClubPageData(abbr) {
  const club = clubsMap.get(abbr);

  const clubMatches = matches.filter(m => m.home === abbr || m.away === abbr);
  const nextMatch = getNextMatch(clubMatches);
  if (!nextMatch) return;
    
  const nextMatchProps = nextMatch ? getNextMatchProps(nextMatch, abbr) : null;

  const clubMatchData = 
    nextMatch.home === abbr
      ? nextMatch.homeData
      : nextMatch.awayData;

  const clubPlayers = players.filter(p => p.clubId === abbr);
  const matchSquadProps = getMatchSquadProps(clubMatchData, clubPlayers);

  return {
    club,
    nextMatchProps,
    matchSquadProps
  };
};
