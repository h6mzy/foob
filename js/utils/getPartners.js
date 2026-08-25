import { clubsMap } from '../../demo/data/';

export function getPartners(clubs) {
  return clubs
    .map(abbr => clubsMap.get(abbr)?.partners)
    .filter(Boolean);
}