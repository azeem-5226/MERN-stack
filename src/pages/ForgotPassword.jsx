import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { forgotPassword } from "../services/api";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleReset = async () => {

    if (!email || !newPassword) {

      alert("Please fill all fields");
      return;

    }

    setLoading(true);

    try {

      const res =
        await forgotPassword({
          email,
          newPassword,
        });

      alert(res.data.message);

      navigate("/login");

    } catch (err) {

      const errorMessage =
        err.response?.data?.message ||
        "Password reset failed ❌";

      alert(errorMessage);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div style={styles.page}>

      {/* RGB */}

      <div style={styles.blueGlow}></div>
      <div style={styles.cyanGlow}></div>

      {/* CARD */}

      <div style={styles.card}>

        {/* HEADER */}

        <div style={styles.header}>

          <div style={styles.logoBox}>
            🔐
          </div>

          <h1 style={styles.mainTitle}>
            NEXCORE
          </h1>

          <p style={styles.subTitle}>

            Reset your secure infrastructure
            account password

          </p>

        </div>

        {/* FORM */}

        <div style={styles.form}>

          {/* EMAIL */}

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Email Address
            </label>

            <div style={styles.inputWrapper}>

              <span style={styles.inputIcon}>
                @
              </span>

              <input
                type="email"
                placeholder="admin@nexcore.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                style={styles.input}
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              New Password
            </label>

            <div style={styles.inputWrapper}>

              <span style={styles.inputIcon}>
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                style={styles.input}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                style={styles.eyeBtn}
              >
                {
                  showPassword
                    ? "🙈"
                    : "👁️"
                }
              </button>

            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={handleReset}
            style={{
              ...styles.button,
              opacity:
                loading ? 0.7 : 1,
            }}
          >

            {
              loading
                ? "Updating..."
                : "Reset Password"
            }

          </button>

        </div>

        {/* FOOTER */}

        <p style={styles.footerText}>

          Back to

          <Link
            to="/login"
            style={styles.link}
          >
            {" "}
            Sign In
          </Link>

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
    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",
    fontFamily:
      "'Inter', system-ui, sans-serif",
    overflow: "hidden",
    position: "relative",
    padding: "20px",
  },

  blueGlow: {
    position: "absolute",
    width: "380px",
    height: "380px",
    background: "#2563eb",
    borderRadius: "50%",
    filter: "blur(140px)",
    opacity: 0.35,
    top: "-80px",
    left: "-80px",
  },

  cyanGlow: {
    position: "absolute",
    width: "340px",
    height: "340px",
    background: "#06b6d4",
    borderRadius: "50%",
    filter: "blur(140px)",
    opacity: 0.25,
    bottom: "-100px",
    right: "-80px",
  },

  card: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: "430px",
    background:
      "rgba(15,23,42,0.75)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "30px",
    padding: "45px 38px",
    backdropFilter: "blur(20px)",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.5)",
  },

  header: {
    textAlign: "center",
    marginBottom: "35px",
  },

  logoBox: {
    width: "75px",
    height: "75px",
    borderRadius: "22px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "34px",
    margin: "0 auto 20px",
    boxShadow:
      "0 10px 40px rgba(37,99,235,0.4)",
  },

  mainTitle: {
    fontSize: "38px",
    fontWeight: "900",
    color: "#fff",
    margin: "0 0 10px 0",
    letterSpacing: "1px",
  },

  subTitle: {
    fontSize: "15px",
    color: "#94a3b8",
    lineHeight: "1.6",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#cbd5e1",
  },

  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  inputIcon: {
    position: "absolute",
    left: "15px",
    fontSize: "16px",
    color: "#94a3b8",
  },

  input: {
    width: "100%",
    padding: "15px 16px 15px 46px",
    borderRadius: "14px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    background:
      "rgba(255,255,255,0.04)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  eyeBtn: {
    position: "absolute",
    right: "14px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#94a3b8",
  },

  button: {
    width: "100%",
    padding: "16px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "#fff",
    border: "none",
    borderRadius: "16px",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "5px",
    boxShadow:
      "0 10px 35px rgba(37,99,235,0.35)",
  },

  footerText: {
    marginTop: "28px",
    textAlign: "center",
    fontSize: "14px",
    color: "#94a3b8",
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "700",
  },

};

export default ForgotPassword;