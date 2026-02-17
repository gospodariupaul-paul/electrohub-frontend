"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: any) => {
    e.preventDefault();

    if (name.length < 3) {
      setError("Numele trebuie să aibă minim 3 caractere");
      return;
    }

    if (!email.includes("@")) {
      setError("Email invalid");
      return;
    }

    if (password.length < 6) {
      setError("Parola trebuie să aibă minim 6 caractere");
      return;
    }

    setError("");

    alert("Cont creat cu succes! (mock)");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4e73df, #1cc88a)",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          padding: "40px 35px",
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 25,
            fontSize: 28,
            fontWeight: "700",
            color: "#1e1e2f",
          }}
        >
          Create Account
        </h2>

        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection