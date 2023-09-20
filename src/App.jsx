import { MantineProvider } from "@mantine/core";
import "./App.css";
import UserScreen from "./pages/homepage/Homepage";
import AdminPage from "./pages/adminpage/AdminScreen";
import Register from "./pages/register/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./pages/auth/Auth";
import Cart from "./pages/create-product/CreateProduct";

export default function App() {
  const { user, signIn, signOut, signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route path="homepage" element={<UserScreen />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="shoppingcart" element={<Cart />} />
      </Routes>
    </MantineProvider>
  );
}
