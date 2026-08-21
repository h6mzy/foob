export function getRemainingPlayers(
  players,
  firstEleven,
  unavailable = []
) {
  const firstElevenNumbers = new Set(firstEleven.map(p => p.number));
  const unavailableMap = new Map(unavailable.map(u => [u.number, u.reason]));

  return players
    .filter(player => !firstElevenNumbers.has(player.number))
    .map(player => ({
      ...player,
      unavailable: unavailableMap.get(player.number) || null
    }));
}
