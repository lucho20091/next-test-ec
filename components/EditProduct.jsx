"use client";
import { useState } from "react";
import { editProduct } from "@/lib/actions/product";

export default function EditProduct({ id, product }) {
  const [productData, setProductData] = useState({
    name: product.name,
    slug: product.slug,
    category: product.category,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    description: product.description,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedPreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    if (!selectedFile) return null;
    setUploading(true);

    try {
      const sigRes = await fetch("/api/signature");
      const { timestamp, signature } = await sigRes.json();

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "uploads");

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await uploadRes.json();
      return data.secure_url;
    } catch (err) {
      return null;
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let imageUrl = productData.image;
    if (selectedFile) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const formatData = {
      ...productData,
      image: imageUrl,
      price: Number(productData.price),
      countInStock: Number(productData.countInStock),
    };

    const updatedProduct = await editProduct(id, formatData);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={productData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={productData.slug}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Product Image
          </label>

          <div className="flex items-center gap-4">
            <img
              src={selectedPreview || productData.image}
              alt="Preview"
              className="w-24 h-24 object-cover rounded border"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="border p-2 rounded bg-gray-50"
            />
          </div>
        </div>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          name="countInStock"
          placeholder="Count in Stock"
          value={productData.countInStock}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded h-24"
        />

        <button
          type="submit"
          disabled={uploading}
          className={`w-full text-white px-4 py-2 rounded transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
