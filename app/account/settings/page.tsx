"use client";

import { useUser } from "@/app/context/UserContext";
import SettingsForm from "./SettingsForm";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function SettingsPage() {
  const { user, loading } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      axiosInstance.get(`/users/${user.id}`).then(res => {
        setUserData(res.data);
      });
    }
  }, [user]);

  if (loading) return null;

  if (!user) {
    return <div className="text-gray-400">Trebuie să fii autentificat.</div>;
  }

  if (!userData) return null;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Setări cont</h1>
      <SettingsForm user={userData} />
    </div>
  );
}
