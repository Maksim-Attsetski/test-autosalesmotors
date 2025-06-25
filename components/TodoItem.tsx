import { useRouter } from "expo-router";
import React, { FC, memo } from "react";
import { TouchableOpacity } from "react-native";

import { todoStatuses } from "@/constants";
import { ITodo } from "@/types";
import { Description, Gap, Text } from "@/ui";
import { useTheme } from "@react-navigation/native";

interface IProps {
  todo: ITodo;
}

const TodoItem: FC<IProps> = ({ todo }) => {
  const { navigate } = useRouter();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => navigate(`/(todos)/details/${todo._id}`)}
      style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}
    >
      <Text fontSize={20} center>
        {todo.title}
      </Text>
      <Gap />
      <Description label="Created at">{new Date(todo.created_at).toLocaleString()}</Description>
      <Gap y={3} />
      <Description label="Status">{todoStatuses[todo.status]}</Description>
    </TouchableOpacity>
  );
};

export default memo(TodoItem);
