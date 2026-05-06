import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const res = await loginUser({
        email,
        password,
      });

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful ✅");

      navigate("/dashboard");

    } catch (err) {

      const errorMessage =
        err.response?.data?.message ||
        "Login Failed ❌";

      alert(errorMessage);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.logo}>
          🌐 PORT HUB
        </h1>

        <h2 style={styles.title}>
          Login
        </h2>

        <p style={styles.subtitle}>
          Access your management dashboard
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={styles.input}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          style={styles.button}
        >

          {loading
            ? "Please wait..."
            : "Login"}

        </button>

        <p style={styles.footerText}>

          Don't have an account?

          <Link
            to="/signup"
            style={styles.link}
          >
            Signup
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
      "linear-gradient(to right, #0f172a, #1e293b)",
    fontFamily: "Inter, sans-serif",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "400px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.2)",
  },

  logo: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#0f172a",
  },

  title: {
    textAlign: "center",
    marginBottom: "5px",
    color: "#0f172a",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  footerText: {
    marginTop: "20px",
    textAlign: "center",
    color: "#64748b",
  },

  link: {
    marginLeft: "5px",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;