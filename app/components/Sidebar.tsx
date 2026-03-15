"use client";

import { useRouter, usePathname } from "next/navigation";
import { menuItems } from "@/app/utils/menuConfig";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  //This line checks if the code is running in the browser
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  //This line prevents rendering if role doesn't exist
  if (!role) return null;

  //This line selects menu based on role
  const items = menuItems[role as "super_admin" | "staff"] || [];

  return (
    <div style={{ width: 250, background: "#f4f4f4", padding: 20 }}>
      <h3>Sidebar</h3>

      {items.map((item) => (
        <div
          key={item.path}
          style={{
            padding: "10px 0",
            cursor: "pointer",
            fontWeight: pathname === item.path ? "bold" : "normal",
          }}
          onClick={() => router.push(item.path)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}