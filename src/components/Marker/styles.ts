import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { DOT_BORDER_WIDTH, LINE_HEIGHT } from '../../constants/theme';

export const markerStyles = StyleSheet.create({
  marker: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: '-50%' }],
  },
  dotContainer: {
    alignItems: 'center',
  },
  topDash: {
    marginBottom: -DOT_BORDER_WIDTH,
    zIndex: 3,
  },
  bottomDash: {
    marginTop: -DOT_BORDER_WIDTH,
    zIndex: 3,
  },
  markerUp: {
    bottom: '100%',
  },
  dot: {
    width: LINE_HEIGHT,
    height: LINE_HEIGHT,
    borderRadius: LINE_HEIGHT / 2,
    borderWidth: DOT_BORDER_WIDTH,
    borderColor: 'white',
    zIndex: 2,
  },
  dotCircle: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    borderRadius: LINE_HEIGHT / 2,
  },
  container: {
    position: 'relative',
  },
  content: {
    transform: [{ translateX: '-50%' }],
    position: 'absolute',
    alignItems: 'center',
  },
  contentTop: {
    marginTop: LINE_HEIGHT,
    marginBottom: moderateScale(4),
  },
  contentDown: {
    marginTop: -LINE_HEIGHT,
  },
  priceText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#000',
    lineHeight: moderateScale(12),
  },
  labelText: {
    fontWeight: '400',
    lineHeight: moderateScale(9),
    fontSize: moderateScale(9),
    color: 'rgba(125, 125, 125, 1)',
  },
});
