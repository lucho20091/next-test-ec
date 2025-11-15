export async function generateMetadata() {
  return {
    title: "Shipping",
    description: `View Shipping`,
  };
}

export default function ProfileLayout({ children }) {
  return <section>{children}</section>;
}
