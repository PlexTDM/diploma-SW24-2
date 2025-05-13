import React from 'react';
import {Text, useFont} from '@shopify/react-native-skia';
import { useAppTheme } from '@/lib/theme';

type Props = {
  x: number;
  y: number;
  text: string;
};

const XAxisText = ({x, y, text}: Props) => {
  const { theme } = useAppTheme();
  const font = useFont(require('@/assets/fonts/Roboto-Regular.ttf'), 14);

  if (!font) {
    return null;
  }

  const fontSize = font.measureText(text);
  const color = theme === 'dark' ? '#fff' : '#000';

  return (
    <Text
      color={color}
      font={font}
      x={x - fontSize.width / 2}
      y={y}
      text={text}
    />
  );
};

export default XAxisText;