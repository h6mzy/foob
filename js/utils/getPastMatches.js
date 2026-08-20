function pastMatches(matches) {
  const now = Date.now();
  return [...matches]
    .filter(match => new Date(match.time) < now)
    .sort((a, b) => a.time.localeCompare(b.time));
};
