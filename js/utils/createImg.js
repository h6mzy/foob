export const createImg = (
  src,
  alt,
  className = 'foob-img',
  fallbackSrc = '/demo/img/placeholder.webp'
) => {
  const article = document.createElement('article');
  article.className = className;

  const img = document.createElement('img')
  img.src =  await imageExists(src, fallbackSrc);
  img.alt = alt;

  article.append(img);
  
  return article;
};
