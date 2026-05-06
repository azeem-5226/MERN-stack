import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault(); // Form refresh rokne ke liye
    if (!email || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword({ email, newPassword });
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Password reset failed ❌";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.logoBadge}>🔐</div>
          <h1 style={styles.mainTitle}>Reset Password</h1>
          <p style={styles.subTitle}>Enter your registered email and a new secure password</p>
        </div>

        <form onSubmit={handleReset} style={styles.form}>
          {/* EMAIL */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Registered Email</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>@</span>
              <input
                type="email"
                placeholder="admin@porthub.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔑</span>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* RESET BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#fcd34d" : "#f59e0b", // Professional Amber/Orange
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Updating Security..." : "Update Password"}
          </button>
        </form>

        <p style={styles.footerText}>
          Remember your password? 
          <Link to="/" style={styles.link}> Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9", // Consistent light grey background
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "48px 40px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  logoBadge: {
    fontSize: "40px",
    marginBottom: "12px",
  },
  mainTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px",
  },
  subTitle: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    marginLeft: "2px",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    fontSize: "14px",
    color: "#94a3b8",
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 42px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s ease",
  },
  button: {
    width: "100%",
    padding: "13px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    marginTop: "10px",
    boxShadow: "0 4px 6px -1px rgba(245, 158, 11, 0.2)",
  },
  footerText: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "14px",
    color: "#64748b",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
    marginLeft: "4px",
  },
};

export default ForgotPassword;