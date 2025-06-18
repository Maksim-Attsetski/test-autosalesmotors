import { useRouter } from "expo-router";
import React from "react";
import { FlatList } from "react-native";

import { Layout, TodoItem } from "@/components";
import { useTodos } from "@/store";
import { Button, Gap, Text } from "@/ui";

const Todos = () => {
  const { todos } = useTodos();
  const { navigate } = useRouter();

  return (
    <Layout>
      <Gap />
      <Text fontSize={28} style={{ fontWeight: "bold" }} center>
        Todos
      </Text>
      <Gap />
      <Button onPress={() => navigate("/(todos)/create")}>CREATE</Button>
      <Gap />

      <FlatList
        scrollEventThrottle={16}
        data={todos}
        showsVerticalScrollIndicator={false}
        keyExtractor={(t) => t._id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        ItemSeparatorComponent={Gap}
      />
    </Layout>
  );
};

export default Todos;
