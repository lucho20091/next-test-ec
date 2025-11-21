export async function generateMetadata() {
  return {
    title: "Checkout",
    description: `View Checkout`,
  };
}

export default function ProfileLayout({ children }) {
  return <section>{children}</section>;
}
