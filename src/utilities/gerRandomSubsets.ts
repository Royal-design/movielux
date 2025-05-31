export const getRandomSubset = <T>(
  data: T[] | undefined,
  count: number
): T[] => {
  if (!data || data.length === 0) return [];

  const dataCopy = [...data];

  for (let i = dataCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dataCopy[i], dataCopy[j]] = [dataCopy[j], dataCopy[i]];
  }

  return dataCopy.slice(0, count);
};
