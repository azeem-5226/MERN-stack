import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // USER DATA
  const user =
    JSON.parse(localStorage.getItem("user"));

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful ✅");

    navigate("/");

  };

  return (
    <nav style={styles.navbar}>

      {/* LEFT */}
      <div style={styles.left}>

        <h1 style={styles.logo}>
          🌐 PORT HUB
        </h1>

        <p style={styles.subtitle}>
          Port Management Dashboard
        </p>

      </div>

      {/* RIGHT */}
      <div style={styles.right}>

        <div style={styles.userBox}>

          <span style={styles.userIcon}>
            👤
          </span>

          <div>

            <p style={styles.userName}>
              {user?.name || "User"}
            </p>

            <p style={styles.userEmail}>
              {user?.email}
            </p>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

const styles = {

  navbar: {
    width: "100%",
    background: "#ffffff",
    padding: "18px 30px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    boxShadow:
      "0 4px 20px rgba(0,0,0,0.05)",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  },

  left: {
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
  },

  subtitle: {
    margin: "4px 0 0",
    color: "#64748b",
    fontSize: "14px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#f8fafc",
    padding: "10px 15px",
    borderRadius: "12px",
  },

  userIcon: {
    fontSize: "22px",
  },

  userName: {
    margin: 0,
    fontWeight: "700",
    color: "#0f172a",
    fontSize: "14px",
  },

  userEmail: {
    margin: 0,
    color: "#64748b",
    fontSize: "12px",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
  },
};

export default Navbar;