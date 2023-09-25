import { useContext, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { AuthContext } from "../../contexts/Auth";
import { Outlet, useNavigate } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";

export default function AdminPage() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, signIn, signOut, signUp } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleUserScreen = () => {
    navigate("/");
  };

  const handleProducts = () => {
    navigate("/admin");
  };

  const handleCategories = () => {
    navigate("/admin/categories");
  };

  return (
    <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
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
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Button
              onClick={handleProducts}
              color="orange"
              radius="md"
              style={{ marginTop: "10px" }}
            >
              Products
            </Button>
            <Button
              onClick={handleCategories}
              color="orange"
              radius="md"
              style={{ marginTop: "10px" }}
            >
              Categories
            </Button>
            <Button
              onClick={() => navigate("/admin/orders")}
              color="green"
              radius="md"
              style={{ marginTop: "10px" }}
            >
              Orders
            </Button>
          </Navbar>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text>Admin page</Text>
              <Button onClick={handleUserScreen}>Home</Button>
              <Button onClick={signOut}>Log Out</Button>
            </div>
          </Header>
        }
      >
        <Outlet />
      </AppShell>
    </ModalsProvider>
  );
}
