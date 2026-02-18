// Closure to track fetch attempts
const createFetchTracker = () => {
  let attempts = 0;
  let lastFetchTime = null;

  return () => {
    attempts++;
    lastFetchTime = new Date();

    return {
      attempts,
      lastFetchTime,
    };
  };
};

export const trackFetch = createFetchTracker();
