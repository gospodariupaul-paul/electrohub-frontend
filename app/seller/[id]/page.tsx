import Image from "next/image";
import Link from "next/link";

interface SellerPageProps {
  params: {
    id: string;
  };
}

// Simulare produs (până conectăm baza de date)
const fakeProduct = {
  title: "iPhone 14 Pro Max",
  price: "4.200 RON",
  description:
    "Telefon în stare excelentă, fără zgârieturi. Baterie 92%. Cutie + accesorii.",
  image:
    "https://images.unsplash.com/photo-1678685888221-4c2aaca5f05d?auto=format&fit=crop&w=800&q=80",
  sellerPhone: "0745 123 456",
};

export default function SellerPage({ params }: SellerPageProps) {
  const { id } = params;

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Înapoi */}
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          fontSize: "18px",
          color: "#555",
        }}
      >
        ← Înapoi la pagina principală
      </Link>

      {/* Imagine produs */}
      <div
        style={{
          width: "100%",
          height: "400px",
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "25px",
        }}
      >
        <Image
          src={fakeProduct.image}
          alt={fakeProduct.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Titlu + preț */}
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        {fakeProduct.title}
      </h1>
      <h2 style={{ fontSize: "28px", color: "#008000", marginBottom: "20px" }}>
        {fakeProduct.price}
      </h2>

      {/* Descriere */}
      <p style={{ fontSize: "18px", lineHeight: "1.6", marginBottom: "30px" }}>
        {fakeProduct.description}
      </p>

      {/* Butoane */}
      <div style={{ display: "flex", gap: "15px" }}>
        <Link
          href={`/chat/${id}`}
          style={{
            padding: "12px 20px",
            background: "#0070f3",
            color: "white",
            borderRadius: "8px",
            fontSize: "18px",
          }}
        >
          Trimite mesaj
        </Link>

        <a
          href={`tel:${fakeProduct.sellerPhone}`}
          style={{
            padding: "12px 20px",
            background: "#28a745",
            color: "white",
            borderRadius: "8px",
            fontSize: "18px",
          }}
        >
          Sună vânzătorul
        </a>
      </div>

      {/* ID produs */}
      <p style={{ marginTop: "40px", color: "#777" }}>
        ID produs: <strong>{id}</strong>
      </p>
    </div>
  );
}
