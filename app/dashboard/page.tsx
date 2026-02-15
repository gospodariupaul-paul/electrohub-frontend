import { FaUsers, FaBoxOpen, FaTags, FaChartLine, FaBell, FaClock } from "react-icons/fa";

export default async function DashboardHome() {
  // Date mock – pot fi înlocuite cu API real
  const stats = {
    users: 128,
    products: 54,
    categories: 12,
    sales: 8740,
  };

  const recentActivity = [
    { id: 1, text: "New user registered: John Doe", time: "2 hours ago" },
    { id: 2, text: "Product added: Lenovo ThinkPad X1", time: "5 hours ago" },
    { id: 3, text: "Category updated: Electronics", time: "1 day ago" },
  ];

  const colors = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"];

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 32, marginBottom: 30 }}>Dashboard Overview</h1>

      {/* CARDURI STATISTICI */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <StatCard title="Total Users" value={stats.users} icon={<FaUsers />} color={colors[0]} />
        <StatCard title="Products" value={stats.products} icon={<FaBoxOpen />} color={colors[1]} />
        <StatCard title="Categories" value={stats.categories} icon={<FaTags />} color={colors[2]} />
        <StatCard title="Monthly Sales" value={stats.sales + " RON"} icon={<FaChartLine />} color={colors[3]} />
      </div>

      {/* SECȚIUNE GRAFIC (placeholder enterprise) */}
      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          border: "1px solid #ddd",
          boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
          marginBottom: 40,
        }}
      >
        <h2 style={{ fontSize: 26, marginBottom: 10 }}>Sales Overview</h2>
        <p style={{ color: "#555", marginBottom: 20 }}>
          Graficul real poate fi integrat cu Chart.js sau Recharts. Momentan este un placeholder enterprise.
        </p>

        <div
          style={{
            height: 200,
            background: "linear-gradient(135deg, #4e73df33, #1cc88a33)",
            borderRadius: 10,
          }}
        ></div>
      </div>

      {/* ACTIVITATE RECENTĂ */}
      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          border: "1px solid #ddd",
          boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ fontSize: 26, marginBottom: 20 }}>Recent Activity</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {recentActivity.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                padding: "12px 15px",
                background: "#f8f9fc",
                borderRadius: 8,
              }}
            >
              <FaBell style={{ fontSize: 22, color: "#4e73df" }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{item.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#777", fontSize: 14 }}>
                  <FaClock /> {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* COMPONENTA CARD STATISTIC */
function StatCard({ title, value, icon, color }: any) {
  return (
    <div
      style={{
        background: color,
        padding: 20,
        borderRadius: 12,
        color: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "0.2s",
      }}
    >
      <div style={{ fontSize: 40 }}>{icon}</div>
      <h3 style={{ fontSize: 20 }}>{title}</h3>
      <p style={{ fontSize: 26, fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
