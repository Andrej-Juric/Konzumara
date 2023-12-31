import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Badge,
  Button,
  Autocomplete,
  rem,
  Pagination,
} from "@mantine/core";
import { IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../config/supabase";
import { modals } from "@mantine/modals";

export default function ProductsTable({}) {
  const theme = useMantineTheme();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [activePage, setPage] = useState(1);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState(0);

  const handleCreateProduct = () => {
    navigate("/admin/create");
  };
  const handleEditProduct = (productId) => {
    navigate(`/admin/edit/${productId}`);
  };
  const handleDelete = async (productId) => {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(value);
    }
  };

  // delete modal

  const openDeleteModal = (productId) =>
    modals.openConfirmModal({
      title: "Delete your product",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this product? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete product", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(productId),
    });

  //
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      const range = activePage ? activePage - 1 : 0;
      const offSet = range * pageSize;
      const { data, error, count } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .ilike("title", `%${searchQuery}%`)
        .range(offSet, offSet * pageSize)
        .limit(5);

      if (error) {
        setError("Ne fetcham");
        setProducts(null);
        console.log(error);
      }
      if (data) {
        setProducts(data);
        setCount(count);
        console.log(count);
        console.log(data);
      }
    };
    fetchData();
  }, [activePage, searchQuery]);

  const largeData = products?.map((product) => product.title);
  console.log(largeData);
  console.log(products);

  // const filteredProducts = products?.filter((product) =>
  //   product.title.toLowerCase().includes(value.toLowerCase())
  // );
  console.log(value);
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
        {product.is_sale ? (
          <Badge
            c={"red"}
            td={"line-through"}
            variant={theme.colorScheme === "dark" ? "light" : "outline"}
          >
            {product.price}
          </Badge>
        ) : (
          <Badge variant={theme.colorScheme === "dark" ? "light" : "outline"}>
            {product.price}
          </Badge>
        )}
      </td>
      <td>
        {product.is_sale ? (
          <Badge color={"red"} variant={"outline"}>
            {product.sale_price}
          </Badge>
        ) : null}
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
              // onClick={() => openDeleteModal(product.id)}
              onClick={() => openDeleteModal(product.id)}
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
      </div>
      <Autocomplete
        placeholder="Search"
        data={largeData ?? []}
        value={value}
        onChange={setValue}
        onKeyDown={(e) => handleEnter(e)}
      />

      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Products name</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Edit | Delete</th>
          </tr>
        </thead>
        <tbody>{allProducts}</tbody>
      </Table>
      <Pagination
        value={activePage}
        onChange={setPage}
        total={Math.ceil(count / 5)}
        color="teal"
        radius="md"
      />
    </ScrollArea>
  );
}
