import { clubsMap, competitionsMap, matches, players } from '../../demo/data/index.js';
import { getMatchdaySquad, getNextMatch } from '../index.js';

export function getClubPageData(abbr) {
  const club = clubsMap.get(abbr);
  const clubPlayers = players.filter(p => p.clubAbbr === abbr);

  const clubMatches = matches.filter(m => m.home === abbr || m.away === abbr);

  const nextMatch = getNextMatch(clubMatches);

  if (!nextMatch) return;
    
  const enrichedNextMatch = nextMatch ? enrichMatch(nextMatch) : null;

  const nature = enrichedNextMatch
    ? enrichedNextMatch.home.abbr === abbr
      ? 'home'
      : 'away'
    : null;

  const squad = enrichedNextMatch
    ? getMatchdaySquad(clubPlayers,enrichedNextMatch[nature])
    : {
        firstEleven: [],
        remaining: clubPlayers,
        unavailable: []
      };

  const comp = competitionsMap.get(enrichedNextMatch.competition);
  const oppNature = nature === 'home' ? 'away' : 'home';
  const opp = cenrichedNextMatch[oppNature];

  const countdownProps = {
    kickoff: enrichedNextMatch.time,
    comp: comp.name,
    compLogo: comp.logo,
    club: opp.name,
    clubLogo: opp.logo,
    partners: [ // toFix
      {
        id: 'partner-01',
        name: 'Owlwait',
        website: 'https://www.owlwait.com/',
        logo: 'https://cdn.jsdelivr.net/gh/h6mzy/foob@main/demo/svg/OWL_r.svg'
      }
    ]
  };

  return {
    club,
    nextMatch: enrichedNextMatch,
    ...squad,
    countdownProps
  };
};

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
};
