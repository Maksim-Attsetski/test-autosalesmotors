import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import Text, { ITextProps } from "./Text";

interface IProps extends PropsWithChildren {
  label: string;
  labelProps?: ITextProps;
  textProps?: ITextProps;
  marginVertical?: number;
}

const Description: FC<IProps> = ({ label, children, labelProps, textProps, marginVertical = 2 }) => {
  const colors = useThemeColor();

  return (
    <View style={[styles.container, { marginVertical }]}>
      <Text color={colors.subText} {...labelProps}>
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
});

export default Description;
