export const isAndroid = () => {
  const detectisAndroid = navigator.userAgent.match(/Android/i);
  return (detectisAndroid !== null ? true : false);
};

export const iOS = () => {
  const detectiOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
  return (detectiOS !== null ? true : false);
};

export const isMobile = () => {
  const detectMobile = navigator.userAgent.match(/iPhone|iPad|iPod|Android/i);
  return (detectMobile !== null ? true : false);
};
