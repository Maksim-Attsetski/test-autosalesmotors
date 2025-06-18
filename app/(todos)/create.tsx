import React, { useState } from "react";

import { Layout } from "@/components";
import { useTodos } from "@/store";
import { ITodo } from "@/types";
import { Button, Gap, Input, Text } from "@/ui";
import { useNavigation } from "expo-router";

const TodosCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const { addTodo } = useTodos();
  const { canGoBack, goBack } = useNavigation();

  const handleClearAll = () => {
    setTitle("");
    setDescription("");
    setLocation("");
  };

  const onSubmit = () => {
    const newTodo: Omit<ITodo, "_id" | "created_at"> = {
      title,
      description,
      location,
    };
    addTodo(newTodo);

    canGoBack() && goBack();
    handleClearAll();
  };

  return (
    <Layout>
      <Text>TodosCreate</Text>
      <Gap />
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        maxLength={25}
        validate={(v) => v.length > 2}
        errorMsg="Минимум 2 символа"
      />
      <Gap y={3} />
      <Input placeholder="Description" value={description} onChangeText={setDescription} maxLength={70} />
      <Gap y={3} />
      <Input
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        maxLength={70}
        validate={(v) => v.length > 9}
        errorMsg="Минимум 10 символов"
      />
      <Gap />
      <Button onPress={onSubmit} primary disabled={title.length < 2 || location.length < 9}>
        Create
      </Button>
    </Layout>
  );
};

export default TodosCreate;
