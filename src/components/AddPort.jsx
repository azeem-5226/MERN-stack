import { useState } from "react";
import { addPort } from "../services/api";

function AddPort() {
  const [serverName, setServerName] = useState("");
  const [portNumber, setPortNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [service, setService] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (!serverName || !portNumber || !website || !service) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      await addPort({
        serverName,
        portNumber,
        website,
        service,
      });

      setServerName("");
      setPortNumber("");
      setWebsite("");
      setService("");

      alert("Port Registered Successfully ✅");
    } catch (err) {
      alert("Registration Failed ❌");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>➕</div>

          <h2 style={styles.title}>Register New Port</h2>

          <p style={styles.subtitle}>
            Configure server port and service details
          </p>
        </div>

        <div style={styles.formBody}>
          {/* SERVER NAME */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>SERVER NAME</label>

            <input
              type="text"
              placeholder="e.g. Server-1"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* PORT */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>PORT NUMBER</label>

            <input
              type="number"
              placeholder="e.g. 3000"
              value={portNumber}
              onChange={(e) => setPortNumber(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* WEBSITE */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>WEBSITE / DOMAIN</label>

            <input
              type="text"
              placeholder="e.g. admin.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* SERVICE */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>SERVICE / KVM</label>

            <input
              type="text"
              placeholder="e.g. KVM-1"
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAdd}
            disabled={isLoading}
            style={{
              ...styles.button,
              background: isLoading ? "#94a3b8" : "#22c55e",
            }}
          >
            {isLoading ? "Saving..." : "Confirm & Save Port"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  container: {
    background: "#fff",
    width: "100%",
    maxWidth: "450px",
    borderRadius: "20px",
    padding: "35px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  iconCircle: {
    width: "60px",
    height: "60px",
    background: "#f0fdf4",
    color: "#22c55e",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    fontSize: "24px",
    marginBottom: "15px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
    color: "#0f172a",
    fontWeight: "800",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "8px",
    fontSize: "14px",
  },

  formBody: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  inputGroup: {
    textAlign: "left",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "700",
    letterSpacing: "1px",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #dbeafe",
    background: "#f8fafc",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default AddPort;
