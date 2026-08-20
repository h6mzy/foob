export function getRemainingPlayers(players, firstEleven) {
  const numbers = new Set(firstEleven.map(player => player.number));

  return players.filter(player => !numbers.has(player.number));
}
