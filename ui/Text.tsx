import React, { FC } from "react";
import { Text as RNText, TextProps } from "react-native";

const Text: FC<TextProps> = (props) => {
  // add some styles if it need
  return <RNText {...props} style={[props.style, { fontSize: 18 }]} />;
};

export default Text;
