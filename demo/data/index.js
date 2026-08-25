import clubs from './clubs.json' with { type: 'json' };
import competitions from './competitions.json' with { type: 'json' };
import matches from './matches.json' with { type: 'json' };
import partners from './partners.json' with { type: 'json' };
import players from './players.json' with { type: 'json' };

const clubsMap = new Map(clubs.map(c => [c.abbr, c]));
const competitionsMap = new Map(competitions.map(c => [c.abbr, c]));
const partnersMap = new Map(partners.map(p => [p.abbr, p]));

export {
  clubs,
  clubsMap,
  competitions,
  competitionsMap,
  matches,
  partners,
  partnersMap,
  players
};
