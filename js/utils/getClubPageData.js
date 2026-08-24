import { clubsMap, competitionsMap, matches, players } from '../../demo/data/index.js';
import { getMatchdaySquad, getNextMatch } from '../index.js';

export function getClubPageData(abbr) {
  const club = clubsMap.get(abbr);
  const clubPlayers = players.filter(p => p.clubAbbr === abbr);

  const clubMatches = matches.filter(m => m.home === abbr || m.away === abbr);

  const nextMatch = getNextMatch(clubMatches);

  if (!nextMatch) return;
    
  const nextMatchProps = nextMatch ? getNextMatchProps(nextMatch) : null;

  /*
  const nature = enrichedNextMatch
    ? enrichedNextMatch.home.abbr === abbr
      ? 'home'
      : 'away'
    : null;

  const squad = enrichedNextMatch
    ? getMatchdaySquad(clubPlayers, enrichedNextMatch[nature])
    : {
        firstEleven: [],
        remaining: clubPlayers,
        unavailable: []
      };
  */

  return {
    club,
    nextMatchProps,
    ...squad
  };
};

function getNextMatchProps(match) {
  const competition = competitionsMap.get(match.competition);
  const comp = competition?.name || '';
  const compLogo = competition?.logo || '';

  const nature = match.home === abbr
    ? 'home'
    : 'away'
  
  const oppNature = nature === 'home' ? 'away' : 'home';
  const opponent = clubsMap.get(match[oppNature]);
  const club = opponent?.name || '';
  const clubLogo = opponent?.logo || '';

  return {
    kickoff: match.time,
    comp,
    compLogo,
    club,
    clubLogo,
    partners: [ // toFix
      {
        id: 'partner-01',
        name: 'Owlwait',
        website: 'https://www.owlwait.com/',
        logo: 'https://cdn.jsdelivr.net/gh/h6mzy/foob@main/demo/svg/OWL_r.svg'
      }
    ]
  };
};
