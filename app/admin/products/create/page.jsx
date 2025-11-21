"use client";
import { useState } from "react";
import { createProduct } from "@/lib/actions/product";
import { Input } from "@/components/ui/input"; // Import Input
import { Label } from "@/components/ui/label"; // Import Label
import { Button } from "@/components/ui/button"; // Import Button

export default function Page() {
  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    category: "",
    image: "/default.jpg",
    price: 0,
    countInStock: 0,
    description: "",
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
      console.error("Error uploading image:", err);
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

    const newProduct = await createProduct(formatData);
    if (newProduct) {
      // Optionally clear form or show success message
      setProductData({
        name: "",
        slug: "",
        category: "",
        image: "/default.jpg",
        price: 0,
        countInStock: 0,
        description: "",
      });
      setSelectedFile(null);
      setSelectedPreview(null);
      // showToast("Product created successfully!", "success"); // Assuming showToast exists
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Create Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            type="text"
            name="slug"
            placeholder="product-slug"
            value={productData.slug}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            type="text"
            name="category"
            placeholder="Category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <Label htmlFor="product-image">Product Image</Label>
          <Input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="file:text-foreground file:bg-gray-50"
          />
          {selectedPreview && (
            <div className="mt-3">
              <img
                src={selectedPreview}
                alt="Image preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <Label htmlFor="countInStock">Count in Stock</Label>
          <Input
            id="countInStock"
            type="number"
            name="countInStock"
            placeholder="Count in Stock"
            value={productData.countInStock}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded h-24" // Keep textarea for multi-line input
          />
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="w-full"
        >
          {uploading ? "Uploading..." : "Save Product"}
        </Button>
      </form>
    </div>
  );
}