export function schedule(clubs) {
  if (clubs.length % 2)
    throw new Error('Number of clubs must be even.');

  const teams = [...clubs];
  const rounds = [];
  const matchesPerRound = teams.length / 2;

  // First half
  for (let round = 0; round < teams.length - 1; round++) {
    const fixtures = [];

    for (let i = 0; i < matchesPerRound; i++) {
      const home = teams[i];
      const away = teams[teams.length - 1 - i];

      fixtures.push({
        id: crypto.randomUUID(),
        round: round + 1,
        played: false,
        time: null,
        venue: `${home.name} Stadium`,
        home: home.id,
        away: away.id,
        events: []
      });
    }

    rounds.push(fixtures);

    // Rotate everyone except first club
    teams.splice(1, 0, teams.pop());
  }

  // Reverse fixtures
  const reverse = rounds.map((fixtures, i) =>
    fixtures.map(fixture => ({
      id: crypto.randomUUID(),
      round: rounds.length + i + 1,
      played: false,
      time: null,
      venue: `${clubs.find(c => c.id === fixture.away).name} Stadium`,
      home: fixture.away,
      away: fixture.home,
      events: []
    }))
  );

  return [...rounds.flat(), ...reverse.flat()];
}
