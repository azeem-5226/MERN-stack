import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Fixed: added state

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword({ email, newPassword });
      alert(res.data.message || "Password updated successfully! ✅");
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
                placeholder="admin@example.com"
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
                type={showPassword ? "text" : "password"} // ✅ Fixed: Toggle type
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ ...styles.input, paddingRight: "45px" }} // Space for eye button
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn} // ✅ Fixed: Style added below
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* RESET BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#fcd34d" : "#f59e0b",
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
    backgroundColor: "#f1f5f9",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "48px 40px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
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
  },
  eyeBtn: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
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
    transition: "all 0.2s ease",
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