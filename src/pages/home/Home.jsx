import { useContext, useState } from "react";
import {
  AppShell,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Select,
} from "@mantine/core";
import { AuthContext } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import SupaProducts from "../api/SupaProducts";

export default function UserScreen() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, signOut, signIn, signUp } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/register");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

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
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text>Lidlara</Text>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/duolingo-logo.png"
                alt="duolingo-logo"
              />
              {user ? <Button onClick={handleAdminClick}>Admin</Button> : null}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {user ? (
                <Button onClick={signOut}>Log Out</Button>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  style={{ marginRight: 10 }}
                  color="green"
                >
                  Login
                </Button>
              )}
              {user ? null : (
                <Button onClick={handleRegisterClick} variant="outline">
                  Register
                </Button>
              )}

              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/shopping-cart--v1.png"
                alt="shopping-cart--v1"
              />
            </div>
          </div>
        </Header>
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      ></div>
      <Text>Our products</Text>
      <SupaProducts />
    </AppShell>
  );
}