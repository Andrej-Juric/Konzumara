import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Button,
  rem,
} from "@mantine/core";
import { useStyles } from "./styles";

export function ProductCard({ product }) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image
          src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Picture"
        />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text fw={500}>{product?.title}</Text>
        </div>
        {product.is_sale ? (
          <Badge color="red" variant="outline">
            On SALE PRICE {product.sale_price} €
          </Badge>
        ) : null}
      </Group>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            {product.is_sale ? (
              <Text
                c={"red"}
                td={"line-through"}
                fz="xl"
                sx={{ lineHeight: 1 }}
              >
                {product.price} €
              </Text>
            ) : (
              <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                {product.price} €
              </Text>
            )}

            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              Price
            </Text>
          </div>

          <Button
            className="btn-add"
            color="green"
            radius="xl"
            style={{ flex: 1 }}
          >
            Add to shopcart
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
