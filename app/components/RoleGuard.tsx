"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard({children,allowedRoles,}: {children: React.ReactNode; allowedRoles: string[]; }) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role || !allowedRoles.includes(role)) {
      router.replace("/dashboard");
    }
  }, []);

  return <>{children}</>;
}