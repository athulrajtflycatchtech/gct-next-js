"use client";

import RoleGuard from "@/app/components/RoleGuard";

export default function ServicesPage() {
  return (
    <RoleGuard allowedRoles={["super_admin"]}>
      <h1>Services Page</h1>
    </RoleGuard>
  );
}