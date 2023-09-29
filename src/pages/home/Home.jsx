import { AppShell, Footer, Text, useMantineTheme } from "@mantine/core";

import ProductsList from "../../components/ProductsList";
import TopBar from "../../components/TopBar";

export default function HomeScreen() {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      footer={
        <Footer height={60} p="md">
          <p>&copy; 2023. Andrej Jurić - All rights reserved.</p>
        </Footer>
      }
      header={<TopBar />}
    >
      <Text>Our products</Text>
      <ProductsList />
    </AppShell>
  );
}
