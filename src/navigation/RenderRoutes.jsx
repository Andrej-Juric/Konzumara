import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserScreen from "../pages/home/Home";
import Register from "../pages/login/Register";
import CreateProduct from "../pages/admin/create-product/CreateProduct";
import EditProduct from "../pages/admin/edit-product/EditProduct";
import AdminPage from "../pages/admin/AdminPage";
import AdminProduct from "../pages/admin/products/AdminProduct";
import Categories from "../pages/admin/categories/Categories";
import Orders from "../pages/admin/orders/Orders";
import CreateCategories from "../pages/admin/categories/create-categories/CreateCategories";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";

export default function RenderRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<UserScreen />} />
        <Route path="register" element={<Register />} />

        <Route path="admin" element={<AdminPage />}>
          <Route path="" element={<AdminProduct />} />
          <Route path="create" element={<CreateProduct />} />
          <Route path="edit/:productId" element={<EditProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="createcategories" element={<CreateCategories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
