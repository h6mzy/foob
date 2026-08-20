export function sortLineup(
  lineup,
  sort = 'c',
  unavailableNumbers = []
) {
  const unavailable = new Set(unavailableNumbers);

  return [...lineup].sort((a, b) => {
    const aUnavailable = unavailable.has(a.number);
    const bUnavailable = unavailable.has(b.number);

    // Available first
    if (aUnavailable !== bUnavailable) {
      return aUnavailable ? 1 : -1;
    }

    switch (sort) {
      case 'c':
        // Captain → goalkeeper → number
        if (a.isCaptain !== b.isCaptain) {
          return a.isCaptain ? -1 : 1;
        }

        if (a.position.toLowerCase() === 'goal' &&
            b.position.toLowerCase() !== 'goal') {
          return -1;
        }

        if (b.position.toLowerCase() === 'goal' &&
            a.position.toLowerCase() !== 'goal') {
          return 1;
        }

        return a.number - b.number;

      case 'g':
        // Goalkeeper → number
        if (a.position.toLowerCase() === 'goal' &&
            b.position.toLowerCase() !== 'goal') {
          return -1;
        }

        if (b.position.toLowerCase() === 'goal' &&
            a.position.toLowerCase() !== 'goal') {
          return 1;
        }

        return a.number - b.number;

      case 'n':
        // Number
        return a.number - b.number;

      default:
        return 0;
    }
  });
}
