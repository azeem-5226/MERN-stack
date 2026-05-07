import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Landing() {

  const [ports, setPorts] = useState([]);

  useEffect(() => {
    fetchPorts();
  }, []);

  const fetchPorts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/ports"
      );

      setPorts(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // LIVE DATABASE DATA

  const totalPorts = ports.length;

  const totalServers =
    [...new Set(
      ports.map((p) => p.serverName)
    )].length;

  const totalKVMs =
    [...new Set(
      ports.map((p) => p.service)
    )].length;

  return (

    <div style={styles.page}>

      {/* NAVBAR */}

      <nav style={styles.navbar}>

        <div style={styles.logoSection}>

          <div style={styles.logoBox}>
            ⚡
          </div>

          <div>

            <h1 style={styles.logo}>
              NEXCORE
            </h1>

            <p style={styles.logoSub}>
              Cloud Infrastructure Platform
            </p>

          </div>

        </div>

        <div style={styles.navButtons}>

          <Link
            to="/login"
            style={styles.loginBtn}
          >
            Login
          </Link>

          <Link
            to="/signup"
            style={styles.signupBtn}
          >
            Get Started
          </Link>

        </div>

      </nav>

      {/* HERO SECTION */}

      <section style={styles.heroSection}>

        <div style={styles.leftSection}>

          <div style={styles.badge}>
            🚀 Enterprise Infrastructure Platform
          </div>

          <h1 style={styles.heading}>
            Smart Port
            Infrastructure
            Management
          </h1>

          <p style={styles.description}>

            Powerful enterprise-grade platform
            for managing ports, KVM routing,
            cloud infrastructure and secure
            server operations in real-time.

          </p>

          {/* LIVE STATUS */}

          <div style={styles.liveStats}>

            {/* PORTS */}

            <div style={styles.statCard}>

              <div style={styles.greenDot}></div>

              <h1 style={styles.statNumber}>
                {totalPorts}
              </h1>

              <p style={styles.statText}>
                Active Ports
              </p>

            </div>

            {/* SERVERS */}

            <div style={styles.statCard}>

              <div style={styles.blueDot}></div>

              <h1 style={styles.statNumber}>
                {totalServers}
              </h1>

              <p style={styles.statText}>
                Servers
              </p>

            </div>

            {/* KVM */}

            <div style={styles.statCard}>

              <div style={styles.purpleDot}></div>

              <h1 style={styles.statNumber}>
                {totalKVMs}
              </h1>

              <p style={styles.statText}>
                KVM Nodes
              </p>

            </div>

          </div>

          {/* BUTTONS */}

          <div style={styles.buttonGroup}>

            <Link
              to="/signup"
              style={styles.primaryBtn}
            >
              Launch Platform
            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer style={styles.footer}>

        <div style={styles.footerGrid}>

          {/* BRAND */}

          <div>

            <div style={styles.footerLogo}>

              <div style={styles.footerLogoBox}>
                ⚡
              </div>

              <div>

                <h2 style={styles.footerBrand}>
                  NEXCORE
                </h2>

                <p style={styles.footerSub}>
                  Enterprise Infrastructure Platform
                </p>

              </div>

            </div>

            <p style={styles.footerDesc}>

              Advanced cloud infrastructure and
              secure port management platform
              designed for enterprise-grade
              networking environments.

            </p>

          </div>

          {/* PLATFORM */}

          <div>

            <h3 style={styles.footerTitle}>
              Platform
            </h3>

            <p style={styles.footerLink}>
              Infrastructure
            </p>

            <p style={styles.footerLink}>
              Port Routing
            </p>

            <p style={styles.footerLink}>
              KVM Nodes
            </p>

            <p style={styles.footerLink}>
              Security Layer
            </p>

          </div>

          {/* INFRA */}

          <div>

            <h3 style={styles.footerTitle}>
              Infrastructure
            </h3>

            <p style={styles.footerLink}>
              Cloud Security
            </p>

            <p style={styles.footerLink}>
              Server Monitoring
            </p>

            <p style={styles.footerLink}>
              Network Stability
            </p>

            <p style={styles.footerLink}>
              Data Protection
            </p>

          </div>

          {/* CONTACT */}

          <div>

            <h3 style={styles.footerTitle}>
              Contact
            </h3>

            <p style={styles.footerLink}>
              support@nexcore.com
            </p>

            <p style={styles.footerLink}>
              Mumbai, India
            </p>

            <p style={styles.footerLink}>
              +91 98765 43210
            </p>

          </div>

        </div>

        {/* BOTTOM */}

        <div style={styles.footerBottom}>

          <p>
            © 2026 NEXCORE • All Rights Reserved
          </p>

          <p>
            Developed By Azeem Noor
          </p>

        </div>

      </footer>

    </div>

  );

}

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  /* NAVBAR */

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 25px",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(2,6,23,0.7)",
    flexWrap: "wrap",
    gap: "15px",
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoBox: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    boxShadow:
      "0 10px 30px rgba(37,99,235,0.35)",
    flexShrink: 0,
  },

  logo: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  logoSub: {
    marginTop: "2px",
    color: "#94a3b8",
    fontSize: "11px",
  },

  navButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  loginBtn: {
    textDecoration: "none",
    color: "#fff",
    padding: "11px 22px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    fontWeight: "600",
    fontSize: "14px",
    textAlign: "center",
  },

  signupBtn: {
    textDecoration: "none",
    color: "#fff",
    padding: "11px 24px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    boxShadow:
      "0 10px 30px rgba(37,99,235,0.35)",
    textAlign: "center",
  },

  /* HERO */

  heroSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    textAlign: "center",
  },

  leftSection: {
    maxWidth: "1050px",
    width: "100%",
  },

  badge: {
    display: "inline-block",
    padding: "10px 18px",
    borderRadius: "30px",
    background: "rgba(37,99,235,0.12)",
    color: "#93c5fd",
    border:
      "1px solid rgba(37,99,235,0.3)",
    marginBottom: "18px",
    fontSize: "13px",
    fontWeight: "700",
  },

  heading: {
    fontSize: "clamp(42px, 10vw, 82px)",
    lineHeight: "1",
    fontWeight: "900",
    marginBottom: "18px",
    marginTop: 0,
    letterSpacing: "-2px",
  },

  description: {
    color: "#cbd5e1",
    fontSize: "clamp(15px, 3vw, 20px)",
    lineHeight: "1.6",
    maxWidth: "760px",
    margin: "auto",
    padding: "0 10px",
  },

  /* STATS */

  liveStats: {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    marginTop: "35px",
    flexWrap: "wrap",
  },

  statCard: {
    background: "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    padding: "24px",
    borderRadius: "24px",
    minWidth: "220px",
    flex: "1 1 250px",
    maxWidth: "280px",
    backdropFilter: "blur(20px)",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.35)",
    transition: "0.3s",
  },

  statNumber: {
    margin: "16px 0 8px 0",
    fontSize: "clamp(36px, 6vw, 52px)",
    fontWeight: "900",
  },

  statText: {
    color: "#94a3b8",
    fontSize: "16px",
  },

  greenDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#22c55e",
    margin: "auto",
    boxShadow:
      "0 0 15px #22c55e",
  },

  blueDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#3b82f6",
    margin: "auto",
    boxShadow:
      "0 0 15px #3b82f6",
  },

  purpleDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#a855f7",
    margin: "auto",
    boxShadow:
      "0 0 15px #a855f7",
  },

  /* BUTTON */

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    marginTop: "35px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    textDecoration: "none",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "#fff",
    padding: "16px 34px",
    borderRadius: "16px",
    fontWeight: "800",
    fontSize: "16px",
    boxShadow:
      "0 10px 35px rgba(37,99,235,0.35)",
    textAlign: "center",
  },

  /* FOOTER */

  footer: {
    marginTop: "20px",
    padding: "55px 25px 25px",
    borderTop:
      "1px solid rgba(255,255,255,0.08)",
    background:
      "rgba(255,255,255,0.03)",
    backdropFilter: "blur(20px)",
  },

  footerGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "40px",
  },

  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  footerLogoBox: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    boxShadow:
      "0 10px 30px rgba(37,99,235,0.35)",
    flexShrink: 0,
  },

  footerBrand: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "900",
  },

  footerSub: {
    color: "#94a3b8",
    marginTop: "4px",
    fontSize: "13px",
  },

  footerDesc: {
    color: "#94a3b8",
    lineHeight: "1.8",
    maxWidth: "400px",
    fontSize: "15px",
  },

  footerTitle: {
    marginBottom: "18px",
    fontSize: "18px",
    fontWeight: "800",
  },

  footerLink: {
    color: "#94a3b8",
    marginBottom: "12px",
    cursor: "pointer",
    transition: "0.3s",
  },

  footerBottom: {
    marginTop: "45px",
    paddingTop: "20px",
    borderTop:
      "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#94a3b8",
    fontSize: "14px",
    flexWrap: "wrap",
    gap: "10px",
    textAlign: "center",
  },

};

export default Landing;