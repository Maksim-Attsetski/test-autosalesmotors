import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList } from "react-native";

import { Layout, TodoItem } from "@/components";
import { todoStatuses } from "@/constants";
import { useTodos } from "@/store";
import { ITodo } from "@/types";
import { Button, Gap, Select, Text } from "@/ui";

const sortOptions = [
  { value: "created_at:asc", label: "By date (asc)" },
  { value: "created_at:desc", label: "By date (desc)" },
];
const filterOptions = [
  { value: "all", label: "All" },
  { value: "CANCELLED", label: todoStatuses.CANCELLED },
  { value: "COMPLETED", label: todoStatuses.COMPLETED },
  { value: "IN_PROGRESS", label: todoStatuses.IN_PROGRESS },
];

const Todos = () => {
  const { todos } = useTodos();
  const { navigate } = useRouter();

  const [sortBy, setSortBy] = useState("created_at:asc");
  const [filter, setFilter] = useState("all");

  const sortedTodos = [...todos]
    .filter((todo) => {
      if (filter === "all") return true;
      return todo.status === filter;
    })
    .sort((a, b) => {
      const sort = sortBy.split(":");

      return sort[1] === "asc"
        ? +a[sort[0] as keyof ITodo] - +b[sort[0] as keyof ITodo]
        : +b[sort[0] as keyof ITodo] - +a[sort[0] as keyof ITodo];
    });

  return (
    <Layout>
      <Gap />
      <Text fontSize={28} style={{ fontWeight: "bold" }} center>
        Todos
      </Text>
      <Gap />
      <Button onPress={() => navigate("/(todos)/create")}>CREATE</Button>
      <Gap />

      <Select title="Sort by" activeOption={sortBy} setActiveOption={setSortBy} options={sortOptions} />
      <Gap />
      <Select title="Filter" activeOption={filter} setActiveOption={setFilter} options={filterOptions} />
      <Gap />

      <FlatList
        scrollEventThrottle={16}
        data={sortedTodos}
        showsVerticalScrollIndicator={false}
        keyExtractor={(t) => t._id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        ItemSeparatorComponent={Gap}
      />
    </Layout>
  );
};

export default Todos;
