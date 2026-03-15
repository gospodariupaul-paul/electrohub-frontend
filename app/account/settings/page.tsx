"use client";

import { useUser } from "@/app/context/UserContext";
import SettingsForm from "./SettingsForm";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function SettingsPage() {
  const { user, loading } = useUser();
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/users/${user.id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.error("Eroare la încărcarea userului:", err);
        })
        .finally(() => {
          setLoadingUserData(false);
        });
    }
  }, [user]);

  if (loading || loadingUserData) {
    return <div className="text-gray-400">Se încarcă...</div>;
  }

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  if (!userData) {
    return <div className="text-red-400">Nu s-au putut încărca datele utilizatorului.</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Setări cont</h1>
      <SettingsForm user={userData} />
    </div>
  );
}
