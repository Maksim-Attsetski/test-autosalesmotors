import { Link } from "expo-router";

import { Layout } from "@/components";
import { Gap, Text } from "@/ui";

export default function HomeScreen() {
  return (
    <Layout>
      <Text>Hello</Text>
      <Link href={"/(todos)"}>
        <Text>Open TODOS</Text>
      </Link>
      <Gap />
      <Link href={"/logs"}>
        <Text>Open LOGS</Text>
      </Link>
    </Layout>
  );
}
