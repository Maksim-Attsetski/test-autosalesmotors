import { Button } from "@/ui";
import DateTimePicker, { BaseProps } from "@react-native-community/datetimepicker";
import React, { FC, useState } from "react";

interface IProps extends BaseProps {
  setValue: (v: Date) => void;
}

const DatePicker: FC<IProps> = ({ setValue, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");

  return (
    <>
      <Button onPress={() => setIsVisible(true)}>
        {props.value.toDateString()} / {props.value.toLocaleTimeString()}
      </Button>
      {isVisible && (
        <DateTimePicker
          {...props}
          mode={mode}
          onChange={(e, v) => {
            setValue(v ?? new Date(e.nativeEvent.timestamp));
            if (mode === "date") {
              setMode("time");
            } else {
              setMode("date");
              setIsVisible(false);
            }
          }}
        />
      )}
    </>
  );
};

export default DatePicker;
