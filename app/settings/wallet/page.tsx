"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function WalletPage() {
  const router = useRouter();
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    axiosInstance
      .get("/wallet", { withCredentials: true })
      .then((res) => setWallet(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-[#0b141a] text-white p-6">
      <button
        onClick={() => router.push("/my-account/settings")}
        className="mb-6 px-4 py-2 bg-[#00aaff] text-black rounded-lg font-semibold hover:bg-[#008fcc]"
      >
        ← Înapoi la setări
      </button>

      <h1 className="text-2xl font-bold mb-6">Portofel electronic</h1>

      {!wallet ? (
        <p>Se încarcă...</p>
      ) : (
        <div className="bg-[#111b21] p-6 rounded-lg border border-white/10 max-w-md">
          <p className="text-gray-300 mb-2">Sold curent</p>
          <p className="text-3xl font-bold mb-4">{wallet.balance} RON</p>

          <h2 className="text-lg font-semibold mb-3">Tranzacții</h2>

          {wallet.transactions.length === 0 ? (
            <p className="text-gray-400">Nu există tranzacții.</p>
          ) : (
            <div className="grid gap-3">
              {wallet.transactions.map((t: any) => (
                <div
                  key={t.id}
                  className="bg-[#0b141a] p-3 rounded border border-white/10"
                >
                  <p className="font-semibold">{t.type}</p>
                  <p className="text-gray-400">{t.amount} RON</p>
                  <p className="text-gray-500 text-sm">{t.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
