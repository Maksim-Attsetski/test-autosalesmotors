import { useTheme } from '@react-navigation/native';
import React, { FC, memo } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

export interface ITextProps extends TextProps {
  color?: string;
  fontSize?: number;
  center?: boolean;
}

interface ITextStyles {
  textAlign?: TextStyle['textAlign'];
  fontWeight?: TextStyle['fontWeight'];
}

const DEFAULT_FONT_SIZE = 18;

const MyText: FC<ITextProps> = (props) => {
  const { colors, fonts } = useTheme();

  return (
    <Text
      {...props}
      style={[
        props?.style,
        {
          fontSize: props?.fontSize ?? DEFAULT_FONT_SIZE,
          color: props?.color ?? colors.text,
          fontFamily: fonts.regular.fontFamily,
          fontWeight: (props?.style as ITextStyles)?.fontWeight ?? '400',
          lineHeight: (props?.fontSize ?? DEFAULT_FONT_SIZE) * 1.4,
          textAlign: props?.center ? 'center' : (props?.style as ITextStyles)?.textAlign,
        },
      ]}
    />
  );
};

export default memo(MyText);
