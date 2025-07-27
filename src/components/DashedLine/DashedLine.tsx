import { FC } from 'react';
import Svg, { Line } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';

import { GREY_DASHED_LINE_HEIGHT } from '../../constants/theme';

type DashedLineWithRoundedEdgesProps = {
  color: ColorValue;
  height?: number;
  styles?: StyleProp<ViewStyle>;
};

const DashedLineWithRoundedEdges: FC<DashedLineWithRoundedEdgesProps> = ({
  height = GREY_DASHED_LINE_HEIGHT,
  styles,
  color = 'black',
}) => {
  return (
    <Svg style={styles} height={height} width={moderateScale(1)}>
      <Line
        x1="1"
        y1="0"
        x2="1"
        y2="100%"
        stroke={color}
        strokeWidth={2}
        strokeDasharray="2.5, 4"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default DashedLineWithRoundedEdges;
