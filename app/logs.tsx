import React, { FC } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { BackButton, Layout } from "@/components";
import { dateUtils } from "@/lib/utils";
import { useTodos } from "@/store";
import { Gap, Text } from "@/ui";

const Logs: FC = () => {
  const { logs, deleteLog } = useTodos();
  return (
    <Layout>
      <Gap />
      <BackButton />
      <Gap />
      <Text fontSize={28} style={{ fontWeight: "bold" }} center>
        ToDo Logs
      </Text>

      <FlatList
        data={logs}
        ListEmptyComponent={<Text>You have no logs</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => deleteLog(item._id)}>
            <Text>{item.action}</Text>
            <Text>{dateUtils.getDate(item.created_at)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(l) => l._id}
      />
    </Layout>
  );
};

export default Logs;
