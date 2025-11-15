import { getProducts } from "@/lib/actions/product";
import Link from "next/link";
import { Edit, Trash2, PlusCircle } from "lucide-react";

export default async function Page() {
  const allProducts = await getProducts();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <Link
          href="/admin/products/create"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={18} />
          Create Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 border-b text-gray-600">
            <tr>
              <th className="text-left p-3 font-semibold">Image</th>
              <th className="text-left p-3 font-semibold">Name</th>
              <th className="text-left p-3 font-semibold">Price</th>
              <th className="text-left p-3 font-semibold">Category</th>
              <th className="text-left p-3 font-semibold">Count</th>
              <th className="text-left p-3 font-semibold w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts && allProducts.length > 0 ? (
              allProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="p-3">
                    <img
                      src={product.image || "/default.jpg"}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                  </td>
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3">${product.price.toFixed(2)}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.countInStock}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit size={16} /> Edit
                      </Link>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500 bg-gray-50"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
