import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/Auth";
import { useForm } from "@mantine/form";
import { Box, Button, Checkbox, NumberInput, TextInput } from "@mantine/core";
import { supabase } from "../config/supabase";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState(null);
  const { productId } = useParams();
  console.log(products);
  // console.log(products[0].title);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("products")
        .select()
        .eq("id", productId);

      if (error) {
        setError("Ne fetcham");
        setProducts(null);
        console.log(error);
      }
      if (data) {
        setProducts(data[0]);
        console.log(data);
      }
    };
    fetchData();
  }, [productId]);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      quantity: "",
      price: "",
      is_sale: false,
      sale_price: "",
      user_id: "",
    },
  });
  useEffect(() => {
    if ((user, productId, products)) {
      form.setValues({
        ...form.values,
        user_id: user.id,
        title: products.title,
        description: products.description,
        quantity: products.quantity,
        price: products.price,
        is_sale: products.is_sale,
        sale_price: products.sale_price,
      });
    }
  }, [user, products]);
  // console.log("User ID:", user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(form.values);

  const editProduct = async () => {
    console.log("slanje zahtjeva");
    const { data, error } = await supabase
      .from("products")
      .update(form.values)
      .eq("id", productId);
    console.log("odgovor na reg:", data, error);
  };

  return (
    <Box maw={340} mx="auto">
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

        <Button onClick={editProduct} type="submit" mt="md">
          Submit
        </Button>
      </form>
    </Box>
  );
}
