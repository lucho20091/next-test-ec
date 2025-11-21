export async function generateMetadata() {
  return {
    title: "Orders",
    description: `View Orders`,
  };
}

export default function ProfileLayout({ children }) {
  return <section>{children}</section>;
}
