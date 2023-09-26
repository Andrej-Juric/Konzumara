import { supabase } from "../../../config/supabase";
import { Box, Button, Checkbox, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/Auth";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const { user } = useContext(AuthContext);
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
    },
  });
  useEffect(() => {
    if (user) {
      form.setValues({ ...form.values, user_id: user.id });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(form.values);

  const addProduct = async () => {
    console.log("slanje zahtjeva");
    const { data, error } = await supabase.from("products").insert(form.values);
    console.log("odgovor na reg:", data, error);
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

        <Button onClick={addProduct} type="submit" mt="md">
          Submit
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </form>
    </Box>
  );
}
