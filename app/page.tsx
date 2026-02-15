import Link from "next/link";

export default function Home() {
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
        <h1
          style={{
            textAlign: "center",
            marginBottom: 25,
            fontSize: 32,
            fontWeight: "800",
            color: "#1e1e2f",
          }}
        >
          Welcome
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: 30,
            fontSize: 16,
            color: "#555",
          }}
        >
          Login to your account or create a new one
        </p>

        {/* LOGIN FORM */}
        <form
          action="/login"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              background: "#4e73df",
              color: "#fff",
              padding: "12px 0",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        {/* REGISTER BUTTON */}
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 14,
            color: "#555",
          }}
        >
          Don’t have an account?
        </p>

        <Link
          href="/register"
          style={{
            display: "block",
            textAlign: "center",
            background: "#1cc88a",
            color: "#fff",
            padding: "12px 0",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: "600",
            marginTop: 10,
          }}
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 15,
  outline: "none",
};
