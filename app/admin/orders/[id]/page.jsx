import EditOrder from "@/components/EditOrder";
import { getOrderById } from "@/lib/actions/order";
export default async function page({ params }) {
  const { id } = await params;
  const order = await getOrderById(id);
  console.log(order);
  return (
    <div>
      <EditOrder order={order} />
    </div>
  );
}
