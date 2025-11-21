import EditProduct from "@/components/EditProduct";
import { getProductById } from "@/lib/actions/product";

export default async function page({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  return <div>{product && <EditProduct id={id} product={product} />}</div>;
}
