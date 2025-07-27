import { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { markerStyles } from './styles';
import DashedLineWithRoundedEdges from '../DashedLine/DashedLine';
import {
  BLUE_DASHED_LINE_HEIGHT,
  GREY_DASHED_LINE_HEIGHT,
  LINE_HEIGHT,
} from '../../constants/theme';

type MarkerProps = {
  skin: 'darkGrey' | 'darkestGrey' | 'blue';
  type: 'dash-up' | 'dash-down' | 'up' | 'down';
  data: { price: number; label: string };
  position: number;
};

const roundToTwo = (num: number) => Math.round(num * 100) / 100;

const Marker: FC<MarkerProps> = ({ skin, type, data, position }) => {
  const currentSkin = useMemo(() => {
    switch (skin) {
      case 'darkestGrey': {
        return 'rgba(88, 88, 88, 1)';
      }
      case 'darkGrey': {
        return 'rgba(161, 161, 161, 1)';
      }
      case 'blue': {
        return 'rgba(185, 215, 238, 1)';
      }
    }
  }, [skin]);

  const isUp = type === 'dash-up' || type === 'up';

  const dashHeight =
    skin === 'blue' ? BLUE_DASHED_LINE_HEIGHT : GREY_DASHED_LINE_HEIGHT;

  return (
    <View style={markerStyles.container}>
      {(type === 'dash-up' || type === 'up') && (
        <View
          style={[
            markerStyles.content,
            markerStyles.contentTop,
            {
              left: `${position}%`,
              bottom: dashHeight + LINE_HEIGHT,
            },
          ]}
        >
          <Text style={markerStyles.priceText}>
            {roundToTwo(data.price).toFixed(2)}
          </Text>
          <Text style={markerStyles.labelText}>{data.label}</Text>
        </View>
      )}
      <View
        style={[
          markerStyles.marker,
          {
            left: `${position}%`,
            marginTop: isUp ? LINE_HEIGHT : -LINE_HEIGHT,
          },
          isUp && markerStyles.markerUp,
        ]}
      >
        <View style={markerStyles.dotContainer}>
          {type === 'dash-up' && (
            <DashedLineWithRoundedEdges
              styles={markerStyles.topDash}
              height={dashHeight}
              color={currentSkin}
            />
          )}
          <View style={markerStyles.dot}>
            <View
              style={[markerStyles.dotCircle, { backgroundColor: currentSkin }]}
            />
          </View>
          {type === 'dash-down' && (
            <DashedLineWithRoundedEdges
              styles={markerStyles.bottomDash}
              height={dashHeight}
              color={currentSkin}
            />
          )}
        </View>
      </View>
      {(type === 'dash-down' || type === 'down') && (
        <View
          style={[
            markerStyles.content,
            markerStyles.contentDown,

            // I'm not sure where this component will be used, but if the margin
            // from the screen is large enough, these styles aren''t needed. If the margin is small,
            // the number could be 10000, for example, and it'll extend beyond the screen
            // 👇
            (position === 0 || position === 100) && {
              alignItems: position === 0 ? 'flex-start' : 'flex-end',
              transform: [{ translateX: position === 0 ? '-10%' : '-90%' }],
            },

            {
              left: `${position}%`,
              top:
                (type === 'down' ? moderateScale(5) : GREY_DASHED_LINE_HEIGHT) +
                LINE_HEIGHT,
            },
          ]}
        >
          <Text style={markerStyles.priceText}>
            {roundToTwo(data.price).toFixed(2)}
          </Text>
          <Text style={markerStyles.labelText}>{data.label}</Text>
        </View>
      )}
    </View>
  );
};

export default Marker;
