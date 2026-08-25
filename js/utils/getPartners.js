import { clubsMap, partnersMap } from '../../demo/data/index.js';

export function getPartners(clubs) {
  return clubs.flatMap(abbr =>
    (clubsMap.get(abbr)?.partners || [])
      .map(partner => partnersMap.get(partner))
      .filter(Boolean)
  );
}
