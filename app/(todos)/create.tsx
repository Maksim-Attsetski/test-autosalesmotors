import React, { useState } from "react";

import { Layout } from "@/components";
import { Gap, Input, Text } from "@/ui";
import Button from "@/ui/Button";

const TodosCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleClearAll = () => {
    setTitle("");
    setDescription("");
    setLocation("");
  };

  const onSubmit = () => {
    const newTodo = {
      title,
      description,
      location,
    };

    handleClearAll();
  };

  return (
    <Layout>
      <Text>TodosCreate</Text>
      <Gap />
      <Input placeholder="Title" value={title} onChangeText={setTitle} maxLength={25} />
      <Input placeholder="Description" value={description} onChangeText={setDescription} maxLength={70} />
      <Input placeholder="Location" value={location} onChangeText={setLocation} maxLength={70} />
      <Gap />
      <Button primary>Create</Button>
    </Layout>
  );
};

export default TodosCreate;
