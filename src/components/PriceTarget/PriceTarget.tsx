import { FC } from 'react';
import { View } from 'react-native';

import combineEqualValues from '../../helpers/combineEqualValues';
import calculatePercentage from '../../helpers/calculatePercentage';
import Marker from '../Marker/Marker';
import getPriceRange from '../../helpers/getPriceRange';
import { PriceTargetData } from '../../api/price-target';
import priceTargetStyles from './styles';

interface PriceTargetProps {
  data: Pick<PriceTargetData, 'low' | 'mean' | 'high' | 'last_close'>;
}

const PriceTarget: FC<PriceTargetProps> = ({ data }) => {
  const { min, max } = getPriceRange(
    data.low,
    data.high,
    data.mean,
    data.last_close,
  );
  const points = combineEqualValues(data.low, data.mean, data.high);

  return (
    <View style={priceTargetStyles.chartContainer}>
      <View style={priceTargetStyles.horizontalLine} />

      {points.map((point, index) => (
        <Marker
          key={index}
          position={calculatePercentage(point.value, min, max)}
          data={{ label: point.label, price: point.value }}
          skin={point.label.includes('Avg') ? 'blue' : 'darkGrey'}
          type={point.label.includes('Avg') ? 'dash-up' : 'down'}
        />
      ))}

      <Marker
        position={calculatePercentage(data.last_close, min, max)}
        data={{ label: 'Last Close', price: data.last_close }}
        skin={'darkestGrey'}
        type={'dash-down'}
      />
    </View>
  );
};

export default PriceTarget;
