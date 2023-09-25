import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserScreen from "../pages/home/Home";
import Register from "../pages/login/Register";
import CreateProduct from "../pages/admin/create-product/CreateProduct";
import EditProduct from "../pages/admin/edit-product/EditProduct";
import AdminPage from "../pages/admin/AdminScreen";

export default function RenderRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<UserScreen />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="create" element={<CreateProduct />} />
        <Route path="edit/:productId" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
