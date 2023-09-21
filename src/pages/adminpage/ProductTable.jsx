import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Badge,
  MultiSelect,
  Button,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../config/supabase";

export default function ProductsTable({}) {
  const theme = useMantineTheme();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();
  const handleCreateProduct = () => {
    navigate("/create");
  };
  const handleEditProduct = (productId) => {
    navigate(`/edit/${productId}`);
  };
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("products").select();

      if (error) {
        setError("Ne fetcham");
        setProducts(null);
        console.log(error);
      }
      if (data) {
        setProducts(data);
        console.log(data);
      }
    };
    fetchData();
  }, []);

  const allProducts = products?.map((product) => (
    <tr key={product.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={product.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {product.title}
          </Text>
        </Group>
      </td>

      <td>
        <Badge variant={theme.colorScheme === "dark" ? "light" : "outline"}>
          {product.price}
        </Badge>
      </td>

      <td>
        <Group spacing={0} position="left">
          <ActionIcon>
            <IconPencil
              onClick={() => handleEditProduct(product.id)}
              size="1rem"
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash
              onClick={() => handleDelete(product.id)}
              size="1rem"
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <div>
        <Button onClick={handleCreateProduct}>Add new product</Button>
        {/* <Button onClick={handleEditProduct}>Edit</Button> */}
      </div>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Products name</th>
            <th>Price</th>
            <th>Edit | Delete</th>
          </tr>
        </thead>
        <tbody>{allProducts}</tbody>
      </Table>
    </ScrollArea>
  );
}
