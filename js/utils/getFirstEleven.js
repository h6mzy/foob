import { groupByPosition, sortLineup } from '../index.js';
import { pickRandom } from 'https://cdn.jsdelivr.net/gh/h6mzy/bits@1.11.8/js/index.js';

// sort by 'c' = captain first, then g, then by number
// sort by 'g' = by g, then number
// sort by 'n' = by number

export function getFirstEleven(players, clubMatchData, sort = 'c') {
  const [d, m, f] = clubMatchData.formation.split('').map(Number);

  const grouped = groupByPosition(players);

  const firstEleven = clubMatchData.lineup
    ? players.filter(p => clubMatchData.firstEleven.includes(p.number))
    : [
        ...pickRandom(grouped.goal, 1),
        ...pickRandom(grouped.defence, d),
        ...pickRandom(grouped.midfield, m),
        ...pickRandom(grouped.forward, f),
      ];

  const matchCaptain =
    clubMatchData.matchCaptain ||
    pickRandom(firstEleven, 1)[0]?.number;

  const captainAssigned = firstEleven.map(player => ({
    ...player,
    isCaptain: player.number === matchCaptain
  }));

  return sortLineup(captainAssigned, sort);
};
