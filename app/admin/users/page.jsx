"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllUsers } from "@/lib/actions/user";

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
      await deleteUserById(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {}
  }

  // Example update (you can replace this with a modal or inline edit)
  async function handleUpdate(id) {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    try {
      const updated = await updateUserById(id, { name: newName });
      setUsers(users.map((u) => (u.id === id ? updated : u)));
    } catch (error) {}
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
                    <Link
                      size="sm"
                      href={`/admin/users/${user.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Update
                    </Link>
                    <button
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </button>
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
