import { getProductById } from "@/lib/actions/product";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const product = await getProductById(id);

    return {
      title: `${product.name}`,
      description: product.description,
      openGraph: {
        title: `${product.name} | TechStore`,
        description: product.description,
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/products/${product.id}`,
        images: [
          {
            url:
              product.image ||
              `${
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
              }/default.jpg`,
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Product",
      description: "View Product details on TechStore",
      openGraph: {
        title: "Product | TechStore",
        description: "View Product details on TechStore",
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/products/${id}`,
        type: "website",
      },
    };
  }
}

export default function ProfileLayout({ children }) {
  return <section>{children}</section>;
}
