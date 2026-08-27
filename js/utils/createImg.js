export const createImg = (
  src,
  alt,
  className = 'foob-img'
) => {
  const article = document.createElement('article');
  article.className = className;

  const img = document.createElement('img')
  img.src = src;
  img.alt = alt;

  img.onerror = () => {
    img.src = 'https://cdn.jsdelivr.net/gh/h6mzy/bits@1.11.11/examples/img/placeholder.webp';
  };

  article.append(img);
  
  return article;
};
