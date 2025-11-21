import { getUserById } from "@/lib/actions/user";
import EditUser from "@/components/EditUser";
export default async function page({ params }) {
  const { id } = await params;
  const user = await getUserById(id);
  return (
    <div>
      <EditUser user={user} />
    </div>
  );
}
