import React from "react";

import { Layout } from "@/components";
import { Text } from "@/ui";
import { Link } from "expo-router";
import { View } from "react-native";

const Todos = () => {
  return (
    <Layout>
      <Text>Todos</Text>
      <View style={{ marginVertical: 3 }} />

      <Link href={"/(todos)/details/1"}>
        <Text>TODO 1</Text>
      </Link>
      <View style={{ marginVertical: 3 }} />
      <Link href={"/(todos)/details/1"}>
        <Text>TODO 2</Text>
      </Link>
      <View style={{ marginVertical: 3 }} />
      <Link href={"/(todos)/details/1"}>
        <Text>TODO 3</Text>
      </Link>
      <View style={{ marginVertical: 3 }} />
      <Link href={"/(todos)/details/1"}>
        <Text>TODO 4</Text>
      </Link>
    </Layout>
  );
};

export default Todos;
