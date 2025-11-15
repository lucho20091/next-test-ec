import { getUserByEmail, createNewUser } from "@/lib/actions/user";
import { getProducts } from "@/lib/actions/product";
import { stackServerApp } from "@/stack/server";
import Product from "@/components/Product";

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
      </div>
    </div>
  );
}
