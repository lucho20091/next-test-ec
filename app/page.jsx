import { getUserByEmail, createNewUser } from "@/lib/actions/user";
import { getProducts } from "@/lib/actions/product";
import { stackServerApp } from "@/stack/server";
import Product from "@/components/Product";
import GetInfo from "@/components/GetInfo";

export const metadata = {
  title: "Home",
  description: "Browse our wide selection of premium electronics and gadgets. Find the perfect tech for your needs.",
  openGraph: {
    title: "TechStore - Home",
    description: "Browse our wide selection of premium electronics and gadgets. Find the perfect tech for your needs.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}`,
    type: "website",
  },
};

export default async function Home() {
  const user = await stackServerApp.getUser();
  const allProducts = await getProducts();
  let existingUser;
  if (user) {
    existingUser = await getUserByEmail();
  }
  if (!existingUser && user) {
    existingUser = await createNewUser();
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts &&
          allProducts.length > 0 &&
          allProducts.map((item) => <Product product={item} key={item.id} />)}
        <GetInfo />
      </div>
    </div>
  );
}