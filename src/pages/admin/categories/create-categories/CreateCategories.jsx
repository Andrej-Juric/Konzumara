import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Box, Button, ColorPicker, TextInput } from "@mantine/core";
import { supabase } from "../../../../config/supabase";

export default function CreateCategories() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/admin/categories");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const form = useForm({
    initialValues: {
      name: "",
      color: "",
    },
  });

  const addCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .insert(form.values);
  };

  useEffect(() => {
    if (user) {
      form.setValues({ ...form.values });
    }
  }, []);

  return (
    <Box maw={340} mx="auto">
      <h1>Add new categories</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
        />
        <ColorPicker
          mt="md"
          label="Color"
          placeholder="Color"
          format="hex"
          {...form.getInputProps("color")}
        />

        <Button onClick={addCategories} type="submit" mt="md">
          Submit
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </form>
    </Box>
  );
}
