import AddPort from "./components/AddPort";
import SearchPort from "./components/SearchPort";

function App() {
  return (
    <div style={styles.dashboardContainer}>
      {/* Global CSS for Animations and Responsive Grid */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes floatEffect {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.8fr;
          gap: 30px;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (max-width: 968px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          padding: 6px 14px;
          borderRadius: 50px;
          fontSize: 13px;
          fontWeight: 600;
          letterSpacing: 0.5px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #22c55e;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px #22c55e;
        }
      `}</style>

      {/* HEADER SECTION */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoContainer}>
            <span style={styles.logoIcon}>🌐</span>
            <h1 style={styles.logoText}><span style={{ color: "#3b82f6" }}>HUB</span></h1>
          </div>
          <p style={styles.subtitle}>Unified Network Gateway & Registry Controller</p>
        </div>

        <div style={styles.headerRight}>
          <div className="status-badge">
            <span className="status-dot"></span>
            SYSTEMS OPERATIONAL
          </div>
        </div>
      </header>

      {/* DASHBOARD GRID LAYOUT */}
      <main className="dashboard-grid" style={{ animation: "fadeIn 0.8s ease" }}>
        
        {/* Left Panel: Creation Form */}
        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <span style={styles.panelIcon}>📥</span>
            <div>
              <h2 style={styles.panelTitle}>Ingress Registry</h2>
              <p style={styles.panelSub}>Deploy new application port bindings</p>
            </div>
          </div>
          <AddPort />
        </section>

        {/* Right Panel: Explorer and Search */}
        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <span style={styles.panelIcon}>🔍</span>
            <div>
              <h2 style={styles.panelTitle}>Active Interface Explorer</h2>
              <p style={styles.panelSub}>Query and modify live system routing</p>
            </div>
          </div>
          <SearchPort />
        </section>

      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} PortHub Controls Inc. All security and routing integrity strictly monitored.</p>
      </footer>
    </div>
  );
}

// --- CORE DASHBOARD STYLES ---
const styles = {
  dashboardContainer: {
    backgroundColor: "#f8fafc", // Light, crisp background
    minHeight: "100vh",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    padding: "30px 40px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "20px 40px",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
    border: "1px solid #e2e8f0",
    flexWrap: "wrap",
    gap: "15px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoIcon: {
    fontSize: "28px",
  },
  logoText: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: "5px 0 0 0",
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
  },
  panel: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "20px",
    marginBottom: "20px",
  },
  panelIcon: {
    fontSize: "24px",
    backgroundColor: "#f1f5f9",
    padding: "10px",
    borderRadius: "12px",
  },
  panelTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
  },
  panelSub: {
    margin: "3px 0 0 0",
    fontSize: "13px",
    color: "#64748b",
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    padding: "20px 0 10px",
    borderTop: "1px solid #e2e8f0",
    color: "#94a3b8",
    fontSize: "12px",
    fontWeight: "500",
    letterSpacing: "0.2px",
  }
};

export default App;