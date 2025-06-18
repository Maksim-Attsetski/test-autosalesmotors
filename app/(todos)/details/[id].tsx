import React from "react";

import { Layout } from "@/components";
import { Text } from "@/ui";
import { useRoute } from "@react-navigation/native";

const TodosDetails = () => {
  const params = useRoute().params as { id: string };
  return (
    <Layout>
      <Text>TodosDetails</Text>
      <Text>{params.id}</Text>
    </Layout>
  );
};

export default TodosDetails;
