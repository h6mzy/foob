const SCORERS = {
  G: 1,
  D: 10,
  M: 25,
  F: 64
};

const GOALS = [
  { value: 0, weight: 18 },
  { value: 1, weight: 30 },
  { value: 2, weight: 28 },
  { value: 3, weight: 15 },
  { value: 4, weight: 6 },
  { value: 5, weight: 2 },
  { value: 6, weight: 1 }
];

const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const chance = p =>
  Math.random() < p;

const pick = array =>
  array[rand(0, array.length - 1)];

function weighted(items) {
  const total = items.reduce((t, i) => t + i.weight, 0);

  let r = Math.random() * total;

  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item.value;
  }
}

function scorer(players) {
  return weighted(
    players.map(player => ({
      value: player,
      weight: SCORERS[player.position]
    }))
  );
}

function goal(players, clubId) {
  // 2% own goal
  if (chance(0.02)) {
    const defender = weighted(
      players
        .filter(p => p.position === 'D')
        .map(player => ({
          value: player,
          weight: 1
        }))
    );

    return {
      id: crypto.randomUUID(),
      type: 'goal',
      minute: rand(1, 90),
      playerId: 'og',
      ownGoalBy: defender.id,
      assistId: null,
      clubId
    };
  }

  const scorerPlayer = scorer(players);

  let assistId = null;

  if (chance(0.75)) {
    let assister;

    do {
      assister = scorer(players);
    } while (assister.id === scorerPlayer.id);

    assistId = assister.id;
  }

  return {
    id: crypto.randomUUID(),
    type: 'goal',
    minute: rand(1, 90),
    playerId: scorerPlayer.id,
    assistId,
    clubId
  };
}

function yellow(players, clubId) {
  return {
    id: crypto.randomUUID(),
    type: 'yellow',
    minute: rand(1, 90),
    playerId: pick(players).id,
    clubId
  };
}

function red(players, clubId) {
  return {
    id: crypto.randomUUID(),
    type: 'red',
    minute: rand(1, 90),
    playerId: pick(players).id,
    clubId
  };
}

export function simulate(fixture, players) {
  const events = [];

  const homePlayers = players.filter(p => p.clubId === fixture.home);
  const awayPlayers = players.filter(p => p.clubId === fixture.away);

  const homeGoals = weighted(GOALS);
  const awayGoals = weighted(GOALS);

  // Goals
  for (let i = 0; i < homeGoals; i++)
    events.push(goal(homePlayers, fixture.home));

  for (let i = 0; i < awayGoals; i++)
    events.push(goal(awayPlayers, fixture.away));

  // Yellow cards (2–6)
  const yellows = rand(2, 6);

  for (let i = 0; i < yellows; i++) {
    const home = chance(0.5);

    events.push(
      yellow(
        home ? homePlayers : awayPlayers,
        home ? fixture.home : fixture.away
      )
    );
  }

  // Red card (15%)
  if (chance(0.15)) {
    const home = chance(0.5);

    events.push(
      red(
        home ? homePlayers : awayPlayers,
        home ? fixture.home : fixture.away
      )
    );
  }

  // Temporary MOTM
  const candidates = events.filter(
    e => e.type === 'goal' && e.playerId !== 'og'
  );

  if (candidates.length) {
    const motm = pick(candidates);

    events.push({
      id: crypto.randomUUID(),
      type: 'motm',
      playerId: motm.playerId,
      clubId: motm.clubId
    });
  }

  events.sort((a, b) => (a.minute ?? 999) - (b.minute ?? 999));

  fixture.events = events;
  fixture.played = true;

  return fixture;
}
