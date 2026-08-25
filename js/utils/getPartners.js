import { clubsMap, partnersMap } from '../../demo/data/index.js';

export function getPartners(clubs) {
  return clubs
    .map(abbr => partnersMap.get(
      clubsMap.get(abbr)?.partners
    ))?.filter(Boolean);
}
