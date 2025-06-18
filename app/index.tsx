import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Hello</Text>
      <Link href={"/(todos)/index"}>Open TODOS</Link>
    </View>
  );
}
