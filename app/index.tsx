import { Link } from "expo-router";

import { Layout } from "@/components";
import { Text } from "@/ui";

export default function HomeScreen() {
  return (
    <Layout>
      <Text>Hello</Text>
      <Link href={"/(todos)/index"}>
        <Text>Open TODOS</Text>
      </Link>
    </Layout>
  );
}
