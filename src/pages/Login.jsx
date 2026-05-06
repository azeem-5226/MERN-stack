import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

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

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            navigate("/dashboard");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Login Failed ❌"
            );

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
                        ⚡
                    </div>

                    <h1 style={styles.mainTitle}>
                        NEXCORE
                    </h1>

                    <p style={styles.subTitle}>

                        Secure Cloud Infrastructure
                        Access Portal

                    </p>

                </div>

                {/* FORM */}

                <form
                    onSubmit={handleLogin}
                    style={styles.form}
                >

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
                                required
                            />

                        </div>

                    </div>

                    {/* PASSWORD */}

                    <div style={styles.inputGroup}>

                        <div style={styles.passwordRow}>

                            <label style={styles.label}>
                                Password
                            </label>

                            <Link
                                to="/forgot-password"
                                style={styles.forgotLink}
                            >
                                Forgot Password?
                            </Link>

                        </div>

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
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                style={styles.input}
                                required
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
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity:
                                loading ? 0.7 : 1,
                        }}
                    >

                        {
                            loading
                                ? "Authenticating..."
                                : "Access Dashboard"
                        }

                    </button>

                </form>

                {/* FOOTER */}

                <p style={styles.footerText}>

                    Don’t have an account?

                    <Link
                        to="/signup"
                        style={styles.link}
                    >
                        {" "}
                        Create Account
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

    passwordRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    forgotLink: {
        fontSize: "13px",
        color: "#38bdf8",
        textDecoration: "none",
        fontWeight: "600",
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
        transition: "0.3s",
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

export default Login;