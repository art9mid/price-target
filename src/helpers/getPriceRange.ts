const getPriceRange = (
  low: number,
  high: number,
  mean: number,
  lastClose: number,
) => {
  const allEqual = low === high && high === mean;

  if (allEqual) {
    const fiftyPercent = mean * 0.5;
    const min = mean - fiftyPercent;
    const max = mean + fiftyPercent;

    return { min, max };
  }

  const values = [low, high, lastClose];
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

export default getPriceRange;
