import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { Button, Grid } from "@mantine/core";
import { FeaturesCard } from "../homepage/Cards";
export default function SupaProducts({}) {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");
  const [orderAscending, setOrderAscending] = useState(true);
  const [productRange, setProductRange] = useState(8);
  console.log(products);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("products")
        .select()
        .limit(productRange)
        .order(orderBy, { ascending: orderAscending });

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
  }, [orderBy, orderAscending, productRange]);

  const toggleOrder = () => {
    setOrderAscending(!orderAscending);
  };

  const handleShowMoreProducts = () => {
    setProductRange(productRange + 4);
  };

  return (
    <div>
      {error ? (
        <p>Došlo je do greške prilikom dohvatanja podataka: {error}</p>
      ) : (
        <div>
          {/* <Select
            data={[
              "Price lowest",
              "Price highest",
              "Ascending A-Z",
              "Descending Z-A",
              "Newest",
              "Oldest",
            ]}
            placeholder="Sort by"
            label="Sort by"
            radius="xl"
            size="xs"
            style={{ width: "120px", marginLeft: "auto" }}
          /> */}
          <Button onClick={() => setOrderBy("title")}>Title</Button>
          <Button onClick={() => setOrderBy("created_at")}>Created at</Button>
          <Button onClick={() => setOrderBy("price")}>Price</Button>
          <Button onClick={toggleOrder}>
            {orderAscending ? "Sort Ascending" : "Sort Descending"}
          </Button>
          <Grid>
            {products &&
              products.map((product) => (
                <Grid.Col key={product.id} sm={6} md={4} lg={3}>
                  <FeaturesCard product={product} />
                </Grid.Col>
              ))}
          </Grid>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              onClick={handleShowMoreProducts}
              className="show-more"
              color="yellow"
              radius="md"
              size="md"
            >
              Show more products
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
