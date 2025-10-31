import { db } from "@/firebase/db";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const ref = doc(db, "system", "settings");
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};
  const maintenance = data.maintenance;

  if (maintenance) {
    redirect("/maintenance");
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}