import { ScrollArea, Button, Text, Title, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/supabase";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateCategories = () => {
    navigate("/admin/createcategories");
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select();

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

  return (
    <ScrollArea>
      <div>
        <Button onClick={handleCreateCategories}>Add new categories</Button>
      </div>
      <div>
        <Title order={2}>Kategorije proizvoda: </Title>
        {categories &&
          categories.map((categorie) => (
            <div key={categorie.id}>
              <Text fw={700} tt={"uppercase"} c={categorie.color}>
                {categorie.name}
              </Text>
            </div>
          ))}
      </div>
    </ScrollArea>
  );
}
