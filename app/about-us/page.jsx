import { Card } from "@/components/ui/card";
import { Package, Headphones, Shield, Truck } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Package,
      title: "Quality Products",
      description:
        "We curate only the best tech products from trusted brands worldwide.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Our customer service team is always ready to help you with any questions.",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "Your data and transactions are protected with industry-standard encryption.",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description:
        "Get your products delivered quickly with our reliable shipping partners.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-4 text-center">About TechStore</h1>
        <p className="text-center text-gray-600 mb-12">
          Your trusted partner for premium technology products
        </p>

        <Card className="p-8 mb-12">
          <h2 className="mb-4">Our Story</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Founded in 2020, TechStore was born from a simple idea: make
              premium technology accessible to everyone. We believe that
              cutting-edge tech shouldn't be complicated or overpriced, and
              we've made it our mission to bring you the best products at
              competitive prices.
            </p>
            <p>
              What started as a small online shop has grown into a trusted
              destination for tech enthusiasts and everyday users alike. We
              carefully curate every product in our catalog, ensuring that each
              item meets our high standards for quality, performance, and value.
            </p>
            <p>
              Today, we serve thousands of satisfied customers worldwide, and
              we're proud to be known for our exceptional customer service, fast
              shipping, and commitment to quality. But we're not stopping here –
              we're constantly expanding our selection and improving our
              services to better serve you.
            </p>
          </div>
        </Card>

        <h2 className="mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 bg-blue-50 border-blue-100">
          <div className="text-center">
            <h2 className="mb-4">Our Mission</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              To empower people through technology by providing access to
              premium products, exceptional service, and expert guidance. We're
              here to help you find the perfect tech solutions for your
              lifestyle and budget.
            </p>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="mb-4">Get In Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Card className="p-4 flex-1 max-w-xs">
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p>support@techstore.com</p>
            </Card>
            <Card className="p-4 flex-1 max-w-xs">
              <p className="text-sm text-gray-600 mb-1">Phone</p>
              <p>1-800-TECH-STORE</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
