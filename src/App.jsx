import { Routes, Route } from "react-router-dom";

import AddPort from "./components/AddPort";
import SearchPort from "./components/SearchPort";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

function Dashboard() {
  return (
    <div style={styles.dashboardContainer}>

      {/* NAVBAR */}
      <Navbar />

      {/* GRID */}
      <main style={styles.grid}>

        {/* LEFT PANEL */}
        <section style={styles.panel}>

          <h2 style={styles.panelTitle}>
            📥 Register New Port
          </h2>

          <AddPort />

        </section>

        {/* RIGHT PANEL */}
        <section style={styles.panel}>

          <h2 style={styles.panelTitle}>
            🔍 Port Explorer
          </h2>

          <SearchPort />

        </section>

      </main>

    </div>
  );
}

function App() {

  return (

    <Routes>

      {/* LOGIN */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* SIGNUP */}
      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* FORGOT PASSWORD */}
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

    </Routes>

  );
}

const styles = {

  dashboardContainer: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Inter, sans-serif",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "25px",
  },

  panel: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  },

  panelTitle: {
    marginBottom: "20px",
    color: "#0f172a",
  },
};

export default App;