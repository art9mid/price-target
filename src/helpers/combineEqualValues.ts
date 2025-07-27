const combineEqualValues = (low: number, mean: number, high: number) => {
  if (low === mean && mean === high) {
    return [{ label: 'Low/Avg/High', value: low }];
  }

  const values = { low, mean, high };
  const valueMap = new Map<number, string[]>();

  Object.entries(values).forEach(([key, value]) => {
    if (!valueMap.has(value)) {
      valueMap.set(value, []);
    }
    valueMap.get(value)?.push(key);
  });

  const result = {
    low: { label: 'Low', value: low },
    mean: { label: 'Avg', value: mean },
    high: { label: 'High', value: high },
  };

  valueMap.forEach((keys) => {
    if (keys.length > 1) {
      const combinedLabel = keys
        .map((key) => (key === 'low' ? 'Low' : key === 'mean' ? 'Avg' : 'High'))
        .join('/');

      keys.forEach((key) => {
        if (key === 'low' || key === 'mean' || key === 'high') {
          result[key].label = combinedLabel;
        }
      });
    }
  });

  return Object.values(result);
};

export default combineEqualValues;
