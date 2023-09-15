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
// import { products } from "../../homepage/json";

export default function ProductsTable({ products }) {
  const theme = useMantineTheme();
  const data = products?.map((product) => product.name);

  const allProducts = products.map((product) => (
    <tr key={product.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={product.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {product.name}
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
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <div>
        <MultiSelect
          style={{ width: "150px" }}
          data={data}
          label="List of our products"
          placeholder="Search ..."
          searchable
          // searchValue={searchValue}
          // onSearchChange={onSearchChange}
          nothingFound="Nothing found"
        />

        <Button>Add new product</Button>
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
