const setupTheme = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;
  const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches;
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
  return {
    "isDarkMode": isDarkMode,
    "isLightMode": isLightMode,
    "isNotSpecified": isNotSpecified,
    "hasNoSupport": hasNoSupport
  };
};

export default setupTheme;
