import { MantineProvider } from "@mantine/core";
import "./App.css";
import UserScreen from "./pages/homepage/Homepage";
import AdminPage from "./pages/adminpage/AdminScreen";
import Register from "./pages/register/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreateProduct from "./pages/create-product/CreateProduct";
import EditProduct from "./pages/edit-product/EditProduct";

export default function App() {
  return (
    <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route path="" element={<UserScreen />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="create" element={<CreateProduct />} />
        <Route path="edit/:productId" element={<EditProduct />} />
      </Routes>
    </MantineProvider>
  );
}
