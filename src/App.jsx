import { MantineProvider } from "@mantine/core";
import "./App.css";
import UserScreen from "./pages/homepage/Homepage";
import AdminPage from "./pages/adminpage/AdminScreen";
import Register from "./pages/register/Register";

export default function App() {
  return (
    <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
      {/* <UserScreen /> */}
      {/* <AdminPage /> */}
      <Register />
    </MantineProvider>
  );
}
