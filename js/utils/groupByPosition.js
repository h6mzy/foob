export function groupByPosition(players) {
  const grouped = { goal: [], defence: [], midfield: [], forward: [] };

  players.forEach(player => {
    const pos = player.position?.trim().toLowerCase();
    
    if (!grouped[pos]) {
      console.warn('Invalid position:', player.name, player.position);
      return;
    }

    grouped[pos].push(player);
  });

  return grouped;
}
