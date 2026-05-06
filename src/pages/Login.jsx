import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);
        try {
            const res = await loginUser({ email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.logoBadge}>⚓</div>
                    <h1 style={styles.mainTitle}>Port Hub</h1>
                    <p style={styles.subTitle}>Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleLogin} style={styles.form}>
                    {/* Email */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
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

                    {/* Password */}
                    <div style={styles.inputGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label style={styles.label}>Password</label>
                            <Link
                                to="/forgot-password"
                                style={styles.forgotLink}
                            >
                                Forgot Password?
                            </Link>            </div>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>🔒</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.eyeBtn}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            backgroundColor: loading ? "#94a3b8" : "#2563eb",
                        }}
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Don't have an account?
                    <Link to="/signup" style={styles.link}> Create one</Link>
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
        backgroundColor: "#f1f5f9", // Light professional grey
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    },
    card: {
        background: "#ffffff",
        padding: "48px 40px",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
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
        fontSize: "28px",
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
    },
    inputWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    inputIcon: {
        position: "absolute",
        left: "14px",
        fontSize: "16px",
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
    eyeBtn: {
        position: "absolute",
        right: "10px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
    },
    forgotLink: {
        fontSize: "13px",
        color: "#2563eb",
        textDecoration: "none",
        fontWeight: "500",
    },
    button: {
        width: "100%",
        padding: "13px",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "10px",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
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
    },
};

export default Login;