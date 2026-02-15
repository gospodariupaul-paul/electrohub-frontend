import LoginForm from "./LoginForm";

export default function LoginPage() {
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
      <LoginForm />
    </div>
  );
}
