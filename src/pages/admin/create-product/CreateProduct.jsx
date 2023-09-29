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

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/admin");
  };

  const clearFile = () => {
    setFile(null);
    // resetRef.current?.();
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
  // console.log(form.values);

  const addProduct = async () => {
    const productData = { ...form.values };
    delete productData.category_id;
    delete productData.product_id;

    const { data: product, error } = await supabase
      .from("products")
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error("greška pri dodavanju proizvoda:", error);
      return;
    }

    console.log("proizvod dodan:", product);

    const { category_id } = form.values;

    await supabase
      .from("product_categories")
      .insert([{ category_id, product_id: product.id }]);

    // add image
    // const uploadsFile = e.target.file[0];
    await supabase.storage
      .from("uploads")
      .upload("public/uploads/user.id", uploadsFile, {
        cacheControl: "3600",
        upsert: false,
      });
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

  // const handleUploadImage = async (file) => {
  //   const url = await uploadFile({
  //     file,
  //     storageName: `uploads/${user.id}`,
  //   });
  //   form.setFieldValue("image", url);
  // };

  // const uploadsFile = e.target.files[0];
  // const addImage = async () => {

  // };

  const addProductAndCategories = () => {
    addProduct();

    // handleUploadImage();
  };

  const mappedCategories =
    categories.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? [];

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
          data={mappedCategories}
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
          <Button disabled={!file} color="red" onClick={clearFile}>
            Reset image
          </Button>
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
