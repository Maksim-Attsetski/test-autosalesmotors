import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { FileList, Layout, Map } from "@/components";
import { todoStatuses } from "@/constants";
import { useFiles } from "@/lib/hooks";
import { useThemeColor } from "@/lib/hooks/useThemeColor";
import { useTodos } from "@/store";
import { TTodoStatus } from "@/types";
import { Accordion, Button, Description, Gap, Text } from "@/ui";

const TodosDetails = () => {
  const params = useRoute().params as { id: string };

  const colors = useThemeColor();
  const { canGoBack, back } = useRouter();

  const { editTodo, deleteTodo, todos } = useTodos();

  const open = useSharedValue(false);
  const todo = todos.find((item) => item._id === params.id);

  const { files, clearFiles } = useFiles(todo?.attachments);

  const ACTIONS = [
    { name: "CANCELLED", action: () => handleChangeStatus("CANCELLED") },
    { name: "COMPLETED", action: () => handleChangeStatus("COMPLETED") },
    { name: "IN_PROGRESS", action: () => handleChangeStatus("IN_PROGRESS") },
  ].filter((item) => item.name !== todo?.status);

  const onPressAccordion = () => {
    open.value = !open.value;
  };

  const handleChangeStatus = (status: TTodoStatus) => {
    editTodo({ _id: params.id, status });
    open.value = false;
  };

  const handleGoBack = () => {
    canGoBack() && back();
  };

  const handleDeleteTodo = () => {
    deleteTodo(params.id);
    handleGoBack();
  };

  return (
    <Layout>
      <Gap />
      <Button onPress={handleGoBack}>Back</Button>
      <Gap />
      {todo ? (
        <>
          <Text fontSize={28} style={styles.title} center>
            {todo.title}
          </Text>

          <Map height={250} width={Dimensions.get("screen").width - 32} />

          <Text fontSize={12}>I don`t connect todo location to map</Text>
          <Gap />
          <View style={[{ backgroundColor: colors.background }, styles.card]}>
            <Description label="Description">{todo?.description}</Description>
            <Gap y={3} />
            <Description label="Location">{todo?.location}</Description>
            <Gap y={3} />
            <Description label="Status">{todoStatuses[todo?.status]}</Description>
          </View>
          <Gap />
          {files.length > 0 && (
            <>
              <View style={[{ backgroundColor: colors.background }, styles.card]}>
                <Text>Attachments</Text>
                <FileList clearFiles={clearFiles} files={files} />
              </View>
              <Gap />
            </>
          )}
          <Button onPress={handleDeleteTodo}>Delete Todo</Button>
          <Gap />
          <TouchableWithoutFeedback onPress={onPressAccordion}>
            <View>
              <Button onPress={onPressAccordion} primary>
                Change ToDo status
              </Button>
              <Accordion isExpanded={open} viewKey="Change ToDo status">
                <View style={styles.actionsContainer}>
                  <Gap />
                  {ACTIONS.map((action) => (
                    <TouchableOpacity key={action.name} onPress={action.action}>
                      <Text fontSize={24} style={styles.actionName}>
                        {todoStatuses[action.name as TTodoStatus]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Accordion>
            </View>
          </TouchableWithoutFeedback>
        </>
      ) : (
        <Text>ToDo with id {params.id} can not be founded</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  card: {
    padding: 12,
    borderRadius: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  actionName: {
    marginVertical: 16,
  },
});

export default TodosDetails;
