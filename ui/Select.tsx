import { useThemeColor } from "@/hooks/useThemeColor";
import React, { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Accordion from "./Accordion";
import Button from "./Button";
import Gap from "./Gap";
import Text from "./Text";

interface IOption {
  label: string;
  value: string;
}

interface IProps {
  title: string;
  options: IOption[];
  activeOption: string;
  setActiveOption: Dispatch<SetStateAction<string>>;
}

const Select: FC<IProps> = ({ title, options, setActiveOption, activeOption }) => {
  const open = useSharedValue(false);
  const colors = useThemeColor();

  const onPressAccordion = () => {
    open.value = !open.value;
  };

  return (
    <TouchableWithoutFeedback onPress={onPressAccordion}>
      <View>
        <Button onPress={onPressAccordion} primary>
          {title}
        </Button>
        <Accordion isExpanded={open} viewKey="Change ToDo status">
          <View style={styles.actionsContainer}>
            <Gap />
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  setActiveOption(option.value);
                  open.value = false;
                }}
              >
                <Text fontSize={24} color={activeOption === option.value ? colors.primary : undefined}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Accordion>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginVertical: 16,
  },
});

export default Select;
