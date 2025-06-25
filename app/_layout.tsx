import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useNotificationsInit } from "@/lib/hooks";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { useTheme } from "@/store";
import { useMemo } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useTheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useNotificationsInit();

  const isDarkTheme = useMemo(() => {
    if (theme === "system") return colorScheme === "dark";
    return theme === "dark";
  }, [colorScheme, theme]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(todos)" options={{ headerShown: false }} />
        <Stack.Screen name="logs" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
