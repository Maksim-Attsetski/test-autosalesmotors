import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";
import Text, { ITextProps } from "./Text";

interface IProps extends PropsWithChildren {
  label: string;
  labelProps?: ITextProps;
  textProps?: ITextProps;
  marginVertical?: number;
}

const Description: FC<IProps> = ({ label, children, labelProps, textProps, marginVertical = 2 }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { marginVertical }]}>
      <Text color={colors.text} style={[labelProps?.style, styles.label]} {...labelProps}>
        {label}
      </Text>
      <Text {...textProps} selectable>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  label: {
    opacity: 0.8,
  },
});

export default Description;
