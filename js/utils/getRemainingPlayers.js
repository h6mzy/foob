export function getRemainingPlayers(players, firstEleven, unavailable = []) {
  return players
    .filter(player => !firstEleven.has(player.number))
    .map(player => ({
      ...player,
      unavailable: unavailableReason(player.number)
    }));
};

const unavailabeReason = (number) => {
  return unavailable.find(u => u.number === number)?.reason || null;
};
