import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      
      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg, #4e73df, #1cc88a)",
          padding: "25px 30px",
          borderRadius: 16,
          color: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: 32, margin: 0 }}>Dashboard</h1>
          <p style={{ opacity: 0.9, marginTop: 6 }}>
            Bun venit înapoi, {session.user?.name}.
          </p>
        </div>

        <img
          src="https://i.pravatar.cc/80"
          alt="avatar"
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.7)",
          }}
        />
      </div>

      {/* STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 25,
        }}
      >
        <StatCard title="Total Users" value="128" color="#1cc88a" />
        <StatCard title="Products" value="54" color="#36b9cc" />
        <StatCard title="Categories" value="12" color="#f6c23e" />
        <StatCard title="Monthly Sales" value="8740 RON" color="#e74a3b" />
      </div>

      {/* SALES GRAPH (placeholder) */}
      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>Sales Overview</h2>

        <div
          style={{
            width: "100%",
            height: 260,
            background:
              "url('https://quickchart.io/chart?c={type:%27line%27,data:{labels:[%27Jan%27,%27Feb%27,%27Mar%27,%27Apr%27,%27May%27],datasets:[{label:%27Sales%27,data:[1200,1900,1500,2200,2800]}]}}')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 12,
          }}
        ></div>
      </div>

      {/* RECENT ACTIVITY */}
      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>Recent Activity</h2>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <ActivityItem text="New user registered: john@example.com" />
          <ActivityItem text="Product added: Gaming Laptop MSI" />
          <ActivityItem text="Category updated: Electronics" />
          <ActivityItem text="User promoted to admin: alex@example.com" />
        </ul>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>Latest Users</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 16,
          }}
        >
          <thead>
            <tr style={{ background: "#f8f9fc", textAlign: "left" }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
            </tr>
          </thead>

          <tbody>
            <TableRow name="John Doe" email="john@example.com" role="Admin" />
            <TableRow name="Maria Popescu" email="maria@example.com" role="User" />
            <TableRow name="Alex Ionescu" email="alex@example.com" role="User" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 25,
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        borderLeft: `6px solid ${color}`,
        transition: "0.2s",
      }}
    >
      <h3 style={{ fontSize: 18, marginBottom: 10, opacity: 0.7 }}>{title}</h3>
      <p style={{ fontSize: 28, fontWeight: "700", margin: 0 }}>{value}</p>
    </div>
  );
}

function ActivityItem({ text }: any) {
  return (
    <li
      style={{
        padding: "12px 0",
        borderBottom: "1px solid #eee",
        fontSize: 16,
      }}
    >
      {text}
    </li>
  );
}

function TableRow({ name, email, role }: any) {
  return (
    <tr style={{ borderBottom: "1px solid #eee" }}>
      <td style={tdStyle}>{name}</td>
      <td style={tdStyle}>{email}</td>
      <td style={tdStyle}>{role}</td>
    </tr>
  );
}

const thStyle = {
  padding: "12px 10px",
  fontWeight: "600",
  borderBottom: "2px solid #e3e6f0",
};

const tdStyle = {
  padding: "12px 10px",
};
