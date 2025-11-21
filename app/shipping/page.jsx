"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateShippingAddress } from "@/lib/actions/user";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { getUserByEmail } from "@/lib/actions/user";
import Link from "next/link";
export default function ShippingFormPage() {
  const [user, setUser] = useState(null);
  const [isDummyUser, setIsDummyUser] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        let currentUser = await getUserByEmail();

        if (currentUser) {
          setIsDummyUser(false);
          setUser(currentUser);
        } else {
          const currentUser = await getDummyUser();
          setIsDummyUser(true);
          setUser(currentUser);
        }

        setFormData({
          fullName: currentUser?.shippingAddress?.fullName || "",
          phoneNumber: currentUser?.shippingAddress?.phoneNumber || "",
          address: currentUser?.shippingAddress?.address || "",
          city: currentUser?.shippingAddress?.city || "",
          postalCode: currentUser?.shippingAddress?.postalCode || "",
        });
      } catch (error) {}
    }

    fetchUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const updateInfo = await updateShippingAddress(formData);
    if (updateInfo) {
      router.push("/checkout");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/cart">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
      </Button>
      <h1 className="mb-8">Shipping Information</h1>

      <p className="text-gray-500 text-center mb-6">
        Please enter your shipping details below.
      </p>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              name="address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                name="city"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP / Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Continue to Checkout
          </Button>
        </form>
      </Card>
    </div>
  );
}
