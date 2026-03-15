"use client";

import RoleGuard from "@/app/components/RoleGuard";

export default function BranchesPage() {
  return (
    <RoleGuard allowedRoles={["super_admin"]}>
      <h1>Branches Page</h1>
    </RoleGuard>
  );
}