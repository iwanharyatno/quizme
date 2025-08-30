"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher<any>("/ping").then((res) => {
      setData(res);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Frontend Next.js 🚀</h1>
      <pre className="mt-4 bg-gray-100 p-3 rounded">{data}</pre>
    </main>
  );
}