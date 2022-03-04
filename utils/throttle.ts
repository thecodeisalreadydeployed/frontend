export const throttle = <T>(func: () => T, timeFrame = 500): (() => void) => {
  let lastTime = 0;
  return () => {
    const now = new Date().getTime();
    if (timeFrame && now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  };
};
