"use client";

import React, { useState } from "react";
import axiosInstance from "@/lib/axios";
import "./contact.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("gospopaul2006@yahoo.com");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!subject || !message) {
      setError("Te rugăm să completezi subiectul și mesajul.");
      return;
    }

    try {
      await axiosInstance.post(
        "/support",
        {
          subject,
          message,
        },
        { withCredentials: true }
      );

      setSuccess(true);

      // ⭐ RESETARE COMPLETĂ FORMULAR
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // ⭐ ascunde mesajul după 3 secunde
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError("A apărut o eroare. Încearcă din nou.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <button className="back-btn" onClick={() => history.back()}>
          ← Înapoi
        </button>

        <h1 className="contact-title">Contact</h1>
        <p className="contact-subtitle">
          Ai întrebări, idei sau feedback? Scrie-mi un mesaj.
        </p>

        {error && <div className="error-msg">{error}</div>}
        {success && (
          <div className="success-msg fade-in">
            Mesajul a fost trimis către admin@electrohub.com!
          </div>
        )}

        <form className="contact-form" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Numele tău"
            className="contact-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="contact-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Subiect"
            className="contact-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            placeholder="Mesajul tău..."
            className="contact-input contact-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit" className="contact-btn">
            Trimite mesaj
          </button>
        </form>
      </div>
    </div>
  );
}
