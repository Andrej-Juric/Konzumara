import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { Button, Grid, Select } from "@mantine/core";
import { FeaturesCard } from "../home/FeaturesCard";
export default function SupaProducts({}) {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [optionSelected, setOptionSelected] = useState("");
  const [productRange, setProductRange] = useState(7);
  console.log(productRange);
  console.log(products);

  const fetchData = async () => {
    let query = supabase.from("products").select().range(0, productRange);

    if (optionSelected === "Price lowest") {
      query = query.order("price", { ascending: true });
    } else if (optionSelected === "Price highest") {
      query = query.order("price", { ascending: false });
    } else if (optionSelected === "Ascending A-Z") {
      query = query.order("title", { ascending: true });
    } else if (optionSelected === "Descending Z-A") {
      query = query.order("title", { ascending: false });
    } else if (optionSelected === "Oldest") {
      query = query.order("created_at", { ascending: true });
    } else if (optionSelected === "Newest") {
      query = query.order("created_at", { ascending: false });
    }

    // const { data, error } = await supabase
    //   .from("products")
    //   .select()
    //   .range(0, productRange)
    //   .order(orderBy, { ascending: orderAscending });

    const { data, error } = await query;

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
  useEffect(() => {
    fetchData();
  }, [productRange, optionSelected]);

  const handleShowMoreProducts = () => {
    if (products.length > productRange) {
      setProductRange(productRange + 8);
    }
  };
  console.log(optionSelected);
  return (
    <div>
      {error ? (
        <p>Došlo je do greške prilikom dohvatanja podataka: {error}</p>
      ) : (
        <div>
          <Select
            data={[
              "Price lowest",
              "Price highest",
              "Ascending A-Z",
              "Descending Z-A",
              "Newest",
              "Oldest",
            ]}
            value={optionSelected}
            placeholder="Sort by"
            label="Sort by"
            radius="xl"
            size="xs"
            style={{ width: "120px", marginLeft: "auto" }}
            onChange={setOptionSelected}
          />

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
