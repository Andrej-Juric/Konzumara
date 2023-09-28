import {
  Box,
  Button,
  Checkbox,
  FileButton,
  Group,
  NumberInput,
  Select,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/supabase";
export default function CreateProduct() {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  // console.log(categories.name);

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/admin");
  };

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      quantity: "",
      price: "",
      is_sale: false,
      sale_price: "",
      user_id: "",
      image: "",
    },
  });
  useEffect(() => {
    if (user) {
      form.setValues({
        ...form.values,
        user_id: user.id,
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(form.values);

  const addProduct = async () => {
    const productData = { ...form.values };
    delete productData.category_id;
    delete productData.product_id;

    const { data, error } = await supabase
      .from("products")
      .insert([productData]);

    if (error) {
      console.error("greška pri dodavanju proizvoda:", error);
      return;
    }

    console.log("proizvod dodan:", data);
    // dohvaćam id
    // const productId = data[0].id;

    // spremam product id
  };
  // console.log(data, productDataResponse);
  // console.log(product_id);
  // console.log(form.values);
  const addCategories = async () => {
    const product_id = form.values.product_id;
    console.log(product_id);
    form.setValues({
      ...form.values,
      product_id: data[0].id,
    });
    const category_id = form.values.category_id;
    console.log("slanje zahtjeva");
    const { data, error } = await supabase
      .from("product_categories")
      .insert([{ category_id, product_id }]);
    console.log("odgovor na reg:", data, error);
  };

  // fetch categories
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, color");

    if (error) {
      setError("Greška");
      setCategories(null);
      console.log(error);
    }
    if (data) {
      setCategories(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUploadImage = async (file) => {
    const url = await uploadFile({
      file,
      storageName: `uploads/${user.id}`,
    });
    form.setFieldValue("image", url);
  };

  const addProductAndCategories = () => {
    addProduct();
    addCategories();
    handleUploadImage();
  };

  return (
    <Box maw={340} mx="auto">
      <h1>Add new product</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          placeholder="Title"
          {...form.getInputProps("title")}
        />
        <TextInput
          mt="md"
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
        />
        <Select
          label="Categories"
          placeholder="Pick category"
          data={
            categories.map((category) => ({
              value: category.id,
              label: category.name,
            })) ?? []
          }
          {...form.getInputProps("category_id")}
        />

        <NumberInput
          label="Quantity"
          placeholder="Quantity"
          {...form.getInputProps("quantity")}
        />
        <NumberInput
          label="Price"
          placeholder="Price"
          {...form.getInputProps("price")}
        />
        <br />
        <Group justify="center">
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>
        </Group>

        {file && (
          <Text size="sm" ta="center" mt="sm">
            Picked file: {file.name}
          </Text>
        )}
        <br />
        <Checkbox
          label="Is on sale"
          placeholder="Is on sale"
          {...form.getInputProps("is_sale")}
        />
        {form.values.is_sale ? (
          <NumberInput
            label="Sale price"
            placeholder="Sale price"
            {...form.getInputProps("sale_price")}
          />
        ) : null}

        <Button onClick={addProductAndCategories} type="submit" mt="md">
          Submit
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </form>
    </Box>
  );
}
