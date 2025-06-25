import { Link } from "expo-router";

import { Layout } from "@/components";
import { TTheme, useTheme } from "@/store";
import { Gap, Select, Text } from "@/ui";

export default function HomeScreen() {
  const { theme, setTheme } = useTheme();

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

      <Gap />
      <Select
        title="Theme"
        activeOption={theme}
        setActiveOption={(v) => setTheme(v as TTheme)}
        options={[
          { label: "Dark", value: "dark" },
          { label: "Light", value: "light" },
          { label: "System", value: "system" },
        ]}
      />
    </Layout>
  );
}
