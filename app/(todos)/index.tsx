import React from "react";

import { Layout } from "@/components";
import { useTodos } from "@/store";
import { Button, Gap, Text } from "@/ui";
import { Link, useNavigation } from "expo-router";
import { FlatList } from "react-native";

const Todos = () => {
  const { todos } = useTodos();
  const { navigate } = useNavigation();

  return (
    <Layout>
      <Text>Todos</Text>
      <Button onPress={() => navigate("create" as never)}>CREATE</Button>
      <Gap />

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <Link href={`/(todos)/details/${item._id}`}>
            <Text>{item.title}</Text>
          </Link>
        )}
        ItemSeparatorComponent={Gap}
      />
    </Layout>
  );
};

export default Todos;
