"use client";

import RoleGuard from "@/app/components/RoleGuard";

export default function CustomersPage() {
  return (
    <RoleGuard allowedRoles={["staff"]}>
      <h1>Customers Page</h1>
    </RoleGuard>
  );
}