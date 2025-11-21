"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllUsers } from "@/lib/actions/user";
import { Button } from "@/components/ui/button"; // Import Button

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users on mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Delete a user
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      // Assuming deleteUserById exists in lib/actions/user.js
      // await deleteUserById(id);
      setUsers(users.filter((u) => u.id !== id));
      // showToast("User deleted successfully!", "success"); // Assuming showToast exists
    } catch (error) {
      console.error("Error deleting user:", error);
      // showToast("Failed to delete user.", "error"); // Assuming showToast exists
    }
  }

  // Example update (you can replace this with a modal or inline edit)
  async function handleUpdate(id) {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    try {
      // Assuming updateUserById exists in lib/actions/user.js
      // const updated = await updateUserById(id, { name: newName });
      // setUsers(users.map((u) => (u.id === id ? updated : u)));
      // showToast("User updated successfully!", "success"); // Assuming showToast exists
    } catch (error) {
      console.error("Error updating user:", error);
      // showToast("Failed to update user.", "error"); // Assuming showToast exists
    }
  }

  if (loading) return <p className="p-4">Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 font-semibold">Name</th>
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Phone</th>
              <th className="px-4 py-2 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.shippingAddress?.phoneNumber || "—"}
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <Button
                      asChild
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      aria-label={`Edit user ${user.name}`} // Added aria-label
                    >
                      <Link href={`/admin/users/${user.id}`}>
                        Update
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      aria-label={`Delete user ${user.name}`} // Added aria-label
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}