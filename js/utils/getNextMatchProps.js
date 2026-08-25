import { competitionsMap } from '../../demo/data/index.js';
import { getOpponents, getPartners } from '../index.js';

export function getNextMatchProps(match, abbr) {
  const opponent = getOpponents(abbr, match, clubsMap);
  const club = opponent?.name || '';
  const clubLogo = opponent?.logo || '';
  
  const competition = competitionsMap.get(match.competition);
  const comp = competition?.name || '';
  const compLogo = competition?.logo || '';

  const partners = getPartners([abbr, opponent.abbr]);

  return {
    kickoff: match.time,
    comp,
    compLogo,
    club,
    clubLogo,
    partners
  };
};
