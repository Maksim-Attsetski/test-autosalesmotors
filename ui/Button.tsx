import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { TColors } from "@/constants/Colors";
import { useThemeColor } from "@/lib/hooks/useThemeColor";
import Text, { ITextProps } from "./Text";

export interface IIconProps {
  name: string;
  size?: number;
  color?: string;
}

type TBtnSize = "large" | "medium";

export interface IButtonProps extends TouchableOpacityProps {
  primary?: boolean;
  textProps?: ITextProps;
  isLoading?: boolean;
  loadingText?: string;
  icon?: IIconProps;
  size?: TBtnSize;
}

const Button: FC<IButtonProps> = ({
  isLoading,
  loadingText = "Пробуем...",
  textProps,
  primary,
  icon,
  size = "large",
  ...props
}) => {
  const colors = useThemeColor();
  const styles = getStyles(colors, size);

  return (
    <TouchableOpacity
      {...props}
      style={[
        props?.style,
        styles.btn,
        { opacity: isLoading || props?.disabled ? 0.8 : 1 },
        primary ? styles.primary : styles.common,
      ]}
    >
      <Text center color={primary ? "#fff" : colors.primary} fontSize={size === "large" ? 20 : 18}>
        {isLoading ? loadingText : props?.children}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (colors: TColors, size?: TBtnSize) =>
  StyleSheet.create({
    btn: {
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: size === "large" ? 12 : 6,
      borderWidth: 1,
      borderStyle: "solid",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
    },
    common: {
      borderColor: colors.primary,
    },
    primary: {
      borderColor: "transparent",
      backgroundColor: colors.primary,
    },
  });

export default Button;
