import { createImg } from '../index.js';
import { Countdown } from 'https://cdn.jsdelivr.net/gh/h6mzy/bits@1.11.9/js/index.js';

function NextMatch({
  club = 'Club Name',
  clubLogo = '',
  comp = 'Competition Name',
  compLogo = '',
  kickoff = null,
  partners = []
} = {}) {

  if (!kickoff) return null;

  const main = document.createElement('div');
  main.className = 'foob-nm-main';

  const nextMatch = document.createElement('div');
  nextMatch.className = 'foob-nm-details';

  const opponent = document.createElement('div');
  opponent.className = 'foob-nm-opponent';

  const article = document.createElement('article');
  article.className = 'foob-nm-opponent-article';

  const clubEl = document.createElement('div');
  clubEl.className = 'foob-nm-club';

  const clubName = document.createElement('div');
  clubName.className = 'foob-nm-name';
  clubName.textContent = club;

  const competition = document.createElement('div');
  competition.className = 'foob-nm-competition';
  competition.textContent = comp;

  clubEl.append(clubName, competition);

  const clubImg = createImg(
    clubLogo,
    club,
    'foob-nm-logo'
  );

  const compImg = createImg(
    compLogo,
    comp,
    'foob-nm-logo'
  );

  article.append(clubEl, clubImg, compImg);
  opponent.append(article);

  const countdown = Countdown(kickoff);

  nextMatch.append(opponent, countdown);

  const partnersWrap = document.createElement('div');
  partnersWrap.className = 'foob-nm-partners';

  if (partners.length > 0) {
    const partnersTitle = document.createElement('div');
    partnersTitle.className = 'foob-nm-partners-title';
    partnersTitle.textContent = 'Partners';

    const partnersEl = document.createElement('div');
    partnersEl.className = 'foob-nm-partners';

    partnersEl.append(...partnerElements(partners));

    partnersWrap.append(partnersTitle, partnersEl);
  }

  main.append(nextMatch, partnersWrap);

  return main;
}

const partnerElements = partners => {
  return partners.map(p => {
    const img = createImg(
      p.logo,
      p.name,
      'foob-nm-partner'
    );

    const a = document.createElement('a');
    a.href = p.website;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    a.append(img);

    return a;
  });
};

export default NextMatch;