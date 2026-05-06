import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signupUser } from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup = async () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      await signupUser({
        name,
        email,
        password,
      });

      alert("Signup Successful ✅");

      navigate("/");

    } catch (err) {

      const errorMessage =
        err.response?.data?.message ||
        "Signup Failed ❌";

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
          Create Account
        </h2>

        <p style={styles.subtitle}>
          Register to access dashboard
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={styles.input}
        />

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
          onClick={handleSignup}
          style={styles.button}
        >

          {loading
            ? "Please wait..."
            : "Signup"}

        </button>

        <p style={styles.footerText}>

          Already have an account?

          <Link
            to="/"
            style={styles.link}
          >
            Login
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
    background: "#22c55e",
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

export default Signup;