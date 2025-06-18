import React, { FC, PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <SafeAreaView style={{ paddingHorizontal: 16 }}>{children}</SafeAreaView>;
};

export default Layout;
