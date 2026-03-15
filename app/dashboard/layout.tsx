"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({children,}: {children: React.ReactNode;}) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/");
    } else {
      requestAnimationFrame(() => setIsReady(true));
    }
  }, [router]);

  if (!isReady) return null;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 20 }}>{children}</div>
    </div>
  );
}