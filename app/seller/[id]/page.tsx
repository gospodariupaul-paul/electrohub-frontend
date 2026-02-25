import Image from "next/image";
import Link from "next/link";

interface SellerPageProps {
  params: { id: string };
}

export default function SellerPage({ params }: SellerPageProps) {
  const product = {
    id: params.id,
    title: "iPhone 14 Pro Max",
    price: "4.200 lei",
    description:
      "Telefon în stare excelentă, fără zgârieturi. Baterie 92%. Cutie + accesorii.",
    image:
      "https://images.unsplash.com/photo-1678685888221-4c2aaca5f05d?auto=format&fit=crop&w=800&q=80",
    seller: {
      name: "Paul Stelian",
      rating: 4.9,
      ads: 23,
      phone: "0745 123 456",
    },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "linear-gradient(135deg, #4f46e5, #9333ea)",
        color: "white",
      }}
    >
      {/* Înapoi */}
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginBottom: "25px",
          fontSize: "20px",
          color: "white",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        ← Înapoi în homepage
      </Link>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.15)",
          padding: "25px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* Imagine produs */}
        <div
          style={{
            width: "100%",
            height: "400px",
            position: "relative",
            borderRadius: "15px",
            overflow: "hidden",
            marginBottom: "25px",
          }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Titlu + preț */}
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          {product.title}
        </h1>
        <h2
          style={{
            fontSize: "32px",
            color: "#00ff9d",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          {product.price}
        </h2>

        {/* Descriere */}
        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.6",
            marginBottom: "30px",
            color: "#f0eaff",
          }}
        >
          {product.description}
        </p>

        {/* Card vânzător */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ fontSize: "26px", marginBottom: "10px" }}>
            Vândut de: {product.seller.name}
          </h3>

          <p style={{ fontSize: "18px", marginBottom: "5px" }}>
            ⭐ {product.seller.rating} / 5
          </p>

          <p style={{ fontSize: "18px", marginBottom: "15px" }}>
            {product.seller.ads} anunțuri publicate
          </p>

          <Link
            href={`/user/${product.seller.name}`}
            style={{
              color: "#00eaff",
              fontSize: "18px",
              textDecoration: "underline",
            }}
          >
            Vezi profilul vânzătorului →
          </Link>
        </div>

        {/* Butoane */}
        <div style={{ display: "flex", gap: "15px" }}>
          <Link
            href={`/chat/${product.id}`}
            style={{
              padding: "14px 22px",
              background: "#00b4ff",
              color: "white",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Trimite mesaj
          </Link>

          <a
            href={`tel:${product.seller.phone}`}
            style={{
              padding: "14px 22px",
              background: "#00ff9d",
              color: "#222",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Sună vânzătorul
          </a>
        </div>
      </div>
    </div>
  );
}
