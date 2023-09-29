import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import {
  Burger,
  Button,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";

export default function TopBar() {
  const [opened, setOpened] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  console.log(user);
  const theme = useMantineTheme();

  const navigate = useNavigate();
  return (
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

          {user && <Button onClick={() => navigate("/admin")}>Admin</Button>}
          {user && (
            <Text>Dobrodošao {user.user_metadata.full_name.toUpperCase()}</Text>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <Button onClick={signOut}>Log Out</Button>
          ) : (
            <Button
              onClick={() => navigate("/register")}
              style={{ marginRight: 10 }}
              color="green"
            >
              Login
            </Button>
          )}
          {user && (
            <Button onClick={() => navigate("/register")} variant="outline">
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
  );
}
