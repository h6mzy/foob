import { groupByPosition, sortLineup } from '../index.js';
import { pickRandom } from 'https://cdn.jsdelivr.net/gh/h6mzy/bits@1.11.8/js/index.js';

// sort by 'c' = captain first, then g, then by number
// sort by 'g' = by g, then number
// sort by 'n' = by number

export function getMatchdaySquad(players, clubMatchData) {
  const unavailableMap = new Map(clubMatchData.unavailable.map(u => [u.number, u.reason]));
  const unavailableNumbers = new Set(unavailableMap.keys());

  const firstEleven = clubMatchData.firstEleven
    ? players.filter(p => clubMatchData.firstEleven.has(p.number))
    : autoPick(
        players.filter(p => !unavailableNumbers.has(p.number)),
        clubMatchData.formation
      );

  const firstElevenNumbers = new Set(firstEleven.map(p => p.number));

  const groups = players.reduce(
    (result, player) => {
      if (firstElevenNumbers.has(player.number)) {
        result.firstEleven.push(player);
      } else if (unavailableMap.has(player.number)) {
        result.unavailable.push({
          ...player,
          reason: unavailableMap.get(player.number)
        });
      } else {
        result.remaining.push(player);
      }
      return result;
    },
    {
      firstEleven: [],
      remaining: [],
      unavailable: []
    }
  );

  const matchCaptain =
    clubMatchData.matchCaptain ||
    pickRandom(groups.firstEleven, 1)[0]?.number;

  groups.firstEleven = groups.firstEleven.map(player => ({
    ...player,
    isCaptain: player.number === matchCaptain
  }));

  return {
    firstEleven: sortLineup(groups.firstEleven, 'c'),
    remaining: sortLineup(groups.remaining, 'n'),
    unavailable: sortLineup(groups.unavailable, 'n')
  };
};

const autoPick = (players, formation) => {
  const [d, m, f] = formation.split('').map(Number);
  const grouped = groupByPosition(players);

  return [
    ...pickRandom(grouped.goal, 1),
    ...pickRandom(grouped.defence, d),
    ...pickRandom(grouped.midfield, m),
    ...pickRandom(grouped.forward, f),
  ];
};
