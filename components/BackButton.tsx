import { useRouter } from "expo-router";
import React, { FC } from "react";

import { Button } from "@/ui";

const BackButton: FC = () => {
  const { canGoBack, back } = useRouter();

  const handleGoBack = () => {
    canGoBack() && back();
  };
  return <Button onPress={handleGoBack}>Back</Button>;
};

export default BackButton;
