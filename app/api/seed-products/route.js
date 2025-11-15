import { seedProducts } from "@/lib/seedProducts";

export async function GET() {
  await seedProducts();
  return Response.json({ status: "done" });
}
