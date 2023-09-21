import { useParams } from "react-router-dom";

export default function DeleteProduct() {
  const { productId } = useParams();
  const deleteProduct = async () => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);
  };
  return;
}
