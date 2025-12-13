"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); // Redireciona imediatamente para a página de login
  }, [router]);

  return null; // Não renderiza nada
}
