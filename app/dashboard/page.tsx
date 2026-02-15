"use client";

export default function DashboardHome() {
  return (
    <div style={{ padding: 30 }}>
      {/* Header */}
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Dashboard Overview</h1>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <div style={cardStyle}>
          <h3 style={cardTitle}>Total Users</h3>
          <p style={cardNumber}>124</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Total Products</h3>
          <p style={cardNumber}>58</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Categories</h3>
          <p style={cardNumber}>12</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Revenue</h3>
          <p style={cardNumber}>32,450 RON</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: 15 }}>Recent Activity</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={activityItem}>New user registered: <strong>paul.st</strong></li>
          <li style={activityItem}>New product added: <strong>Laptop Lenovo ThinkPad</strong></li>
          <li style={activityItem}>Category updated: <strong>Electronics</strong></li>
          <li style={activityItem}>Order #1024 completed</li>
        </ul>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: 10,
  border: "1px solid #ddd",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

const cardTitle = {
  fontSize: 16,
  marginBottom: 10,
  color: "#555",
};

const cardNumber = {
  fontSize: 26,
  fontWeight: "bold",
  color: "#000",
};

const sectionStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  border: "1px solid #ddd",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

const activityItem = {
  padding: "10px 0",
  borderBottom: "1px solid #eee",
  fontSize: 15,
};
