import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { LINE_HEIGHT } from '../../constants/theme';

const priceTargetStyles = StyleSheet.create({
  chartContainer: {
    justifyContent: 'center',
    position: 'relative',
    height: moderateScale(150),
  },
  horizontalLine: {
    width: '100%',
    height: LINE_HEIGHT,
    backgroundColor: 'rgba(236, 236, 236, 1)',
    borderRadius: LINE_HEIGHT,
  },
});

export default priceTargetStyles;
