import { FC, useEffect, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { useThemeColor } from "@/lib/hooks/useThemeColor";
import Gap from "./Gap";
import Text from "./Text";

export interface IInputProps extends TextInputProps {
  validate?: (value: string) => boolean;
  errorMsg?: string;
}

const Input: FC<IInputProps> = ({ validate, errorMsg, ...props }) => {
  const colors = useThemeColor();

  const [isFocused, setIsFocused] = useState<boolean>(props?.autoFocus ?? false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const isInvalid = (error || (error && isFocused)) && isTouched;

  useEffect(() => {
    validate && props?.value && setError(!validate?.(props?.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.value]);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        onFocus={(e) => {
          props?.onFocus?.(e);
          setIsFocused(true);
          !isTouched && setIsTouched(true);
        }}
        onBlur={(e) => {
          props?.onBlur?.(e);
          setIsFocused(false);
        }}
        style={[
          props?.style,
          styles.input,
          {
            borderColor: isInvalid ? colors.error : isFocused ? colors.primary : "transparent",
            backgroundColor: colors.background,
            color: colors.text,
          },
        ]}
        selectionColor={colors.primary + "40"}
        cursorColor={colors.primary}
        placeholderTextColor={colors.text}
      />
      <Gap y={3} />
      {isInvalid && (
        <Text color={colors.error} fontSize={12}>
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 16,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
  },
});

export default Input;
