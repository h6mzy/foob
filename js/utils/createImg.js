export const createImg = (src, alt, className = 'foob-img') => {
  const article = document.createElement('article');
  article.className = className;

  const img = document.createElement('img')
  img.src = src;
  img.alt = alt;

  article.append(img);
  
  return article;
};