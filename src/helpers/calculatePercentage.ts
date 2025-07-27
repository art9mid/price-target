const calculatePercentage = (value: number, min: number, max: number) => {
  if (max === min) {
    return 50;
  }
  const percentage = ((value - min) / (max - min)) * 100;
  if (percentage <= 0) {
    return 0;
  } else if (percentage >= 100) {
    return 100;
  }

  return percentage;
};

export default calculatePercentage;
