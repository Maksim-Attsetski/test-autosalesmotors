import { useRouter } from "expo-router";
import React, { useState } from "react";

import { DatePicker, Layout } from "@/components";
import { useNotifications } from "@/lib/hooks";
import { dateUtils } from "@/lib/utils";
import { useTodos } from "@/store";
import { ITodoCreateDto } from "@/types";
import { Button, Gap, Input, Text } from "@/ui";

const TodosCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dueAt, setDueAt] = useState(new Date());

  const { notify } = useNotifications();

  const { addTodo } = useTodos();
  const { canGoBack, back } = useRouter();

  const handleClearAll = () => {
    setTitle("");
    setDescription("");
    setLocation("");
  };

  const handleGoBack = () => {
    canGoBack() && back();
  };

  const onSubmit = async () => {
    const newTodo: ITodoCreateDto = {
      title,
      description,
      location,
      due_at: dueAt.getTime(),
      attachments: [],
    };

    addTodo(newTodo);
    const seconds = dateUtils.getSecondForExpire(dateUtils.getAdjustedDate(-1, "month", dueAt));

    await notify(
      {
        title: "You create new ToDo",
        body: title,
        data: { newTodo },
      },
      seconds
    );

    handleGoBack();
    handleClearAll();
  };

  return (
    <Layout>
      <Gap />
      <Button onPress={handleGoBack}>Back</Button>

      <Gap />
      <Text fontSize={28} style={{ fontWeight: "bold" }} center>
        ToDo Creation
      </Text>
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
      <Gap y={3} />

      <DatePicker minimumDate={new Date()} value={dueAt} setValue={setDueAt} />
      <Gap />
      <Button onPress={onSubmit} primary disabled={title.length < 2 || location.length < 9}>
        Create
      </Button>
    </Layout>
  );
};

export default TodosCreate;
