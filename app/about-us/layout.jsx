export async function generateMetadata() {
  return {
    title: "About Us",
    description: `Learn more about TechStore, our mission, and our commitment to quality electronics.`,
    openGraph: {
      title: "About TechStore",
      description: "Learn more about TechStore, our mission, and our commitment to quality electronics.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/about-us`,
      type: "website",
    },
  };
}

export default function AboutUsLayout({ children }) {
  return <section>{children}</section>;
}