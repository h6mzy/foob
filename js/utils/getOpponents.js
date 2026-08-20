export function getOpponents(abbr, match, clubsMap) {
  const oppAbbr = match.home === abbr ? match.away : match.home;
  return clubsMap.get(oppAbbr);
};
