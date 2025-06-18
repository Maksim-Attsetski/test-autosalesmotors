/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColor = "#0a7ea4";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    primary: tintColor,
    error: "#e33456",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    primary: tintColor,
    error: "#e33456",
  },
};

export type TColors = (typeof Colors)["dark"];
