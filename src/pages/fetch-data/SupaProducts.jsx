import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { Grid } from "@mantine/core";
import { FeaturesCard } from "../homepage/Cards";
export default function SupaProducts({}) {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  console.log(products);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("products")
        .select()
        .range(0, 5);

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

  return (
    <div>
      {error ? (
        <p>Došlo je do greške prilikom dohvatanja podataka: {error}</p>
      ) : (
        <Grid>
          {products &&
            products.map((product) => (
              <Grid.Col key={product.id} sm={6} md={4} lg={3}>
                <FeaturesCard product={product} />
              </Grid.Col>
            ))}
        </Grid>
      )}
    </div>
  );
}
