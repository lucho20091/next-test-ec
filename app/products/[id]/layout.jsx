import { getProductById } from "@/lib/actions/product";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const product = await getProductById(id);

    return {
      title: `${product.name}`,
      description: `View ${product.name}`,
    };
  } catch {
    return {
      title: "Product",
      description: "View Product",
    };
  }
}

export default function ProfileLayout({ children }) {
  return <section>{children}</section>;
}
