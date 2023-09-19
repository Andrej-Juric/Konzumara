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
  Grid,
  Select,
} from "@mantine/core";
import { FeaturesCard } from "./Cards";
import { products } from "./json";
import { AuthContext } from "../auth/Auth";
import { useNavigate } from "react-router-dom";

export default function UserScreen() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, signIn, signOut, signUp } = useContext(AuthContext);

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
              <Button onClick={handleAdminClick}>Admin</Button>
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

              <Button onClick={handleRegisterClick} variant="outline">
                Register
              </Button>

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
      >
        <Select
          data={[
            "Price lowest",
            "Price highest",
            "Ascending A-Z",
            "Descending Z-A",
            "Newest",
            "Oldest",
          ]}
          placeholder="Sort by"
          label="Sort by"
          radius="xl"
          size="xs"
          style={{ width: "120px", marginLeft: "auto" }}
        />
      </div>
      <Text>Our products</Text>

      <Grid>
        {products.map((product) => (
          <Grid.Col key={product.id} sm={6} md={4} lg={3}>
            <FeaturesCard product={product} />
          </Grid.Col>
        ))}
      </Grid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button className="show-more" color="yellow" radius="md" size="md">
          Show more products
        </Button>
      </div>
    </AppShell>
  );
}
