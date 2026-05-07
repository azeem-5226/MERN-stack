import { useState } from "react";
import { addPort } from "../services/api";

function AddPort({ refreshData }) {

  const [serverName, setServerName] =
    useState("");

  const [portNumber, setPortNumber] =
    useState("");

  const [website, setWebsite] =
    useState("");

  const [service, setService] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  // TOAST STATE

  const [toast, setToast] =
    useState({
      show: false,
      message: "",
      type: "success",
    });

  // SHOW TOAST

  const showToast = (
    message,
    type = "success"
  ) => {

    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {

      setToast({
        show: false,
        message: "",
        type: "success",
      });

    }, 3000);

  };

  // ADD PORT

  const handleAdd = async () => {

    if (
      !serverName ||
      !portNumber ||
      !website ||
      !service
    ) {

      showToast(
        "Please fill all fields",
        "error"
      );

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

      // CLEAR FORM

      setServerName("");
      setPortNumber("");
      setWebsite("");
      setService("");

      // SUCCESS TOAST

      showToast(
        "Port Registered Successfully ✅",
        "success"
      );

      // REFRESH DATA

      if (refreshData) {

        refreshData();

      }

    } catch (err) {

      console.log(err);

      const errorMessage =
        err.response?.data?.message ||
        "Registration Failed ❌";

      showToast(
        errorMessage,
        "error"
      );

    } finally {

      setIsLoading(false);

    }
  };

  return (

    <div style={styles.page}>

      {/* TOAST */}

      {
        toast.show && (

          <div
            style={{
              ...styles.toast,
              background:
                toast.type === "success"
                  ? "linear-gradient(to right,#22c55e,#16a34a)"
                  : "linear-gradient(to right,#ef4444,#dc2626)",
            }}
          >

            {toast.message}

          </div>

        )
      }

      {/* ANIMATION */}

      <style>

        {`

        @keyframes slideIn {

          from {

            opacity: 0;
            transform:
              translateX(120px);

          }

          to {

            opacity: 1;
            transform:
              translateX(0);

          }

        }

      `}

      </style>

      <div style={styles.container}>

        {/* HEADER */}

        <div style={styles.header}>

          <div style={styles.iconCircle}>
            ➕
          </div>

          <h2 style={styles.title}>
            Register New Port
          </h2>

          <p style={styles.subtitle}>
            Configure server port and
            infrastructure details
          </p>

        </div>

        {/* FORM */}

        <div style={styles.formBody}>

          {/* SERVER */}

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              SERVER NAME
            </label>

            <input
              type="text"
              placeholder="e.g. Server-1"
              value={serverName}
              onChange={(e) =>
                setServerName(
                  e.target.value
                )
              }
              style={styles.input}
            />

          </div>

          {/* PORT */}

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              PORT NUMBER
            </label>

            <input
              type="number"
              placeholder="e.g. 3000"
              value={portNumber}
              onChange={(e) =>
                setPortNumber(
                  e.target.value
                )
              }
              style={styles.input}
            />

          </div>

          {/* WEBSITE */}

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              WEBSITE / DOMAIN
            </label>

            <input
              type="text"
              placeholder="e.g. admin.com"
              value={website}
              onChange={(e) =>
                setWebsite(
                  e.target.value
                )
              }
              style={styles.input}
            />

          </div>

          {/* SERVICE */}

          <div style={styles.inputGroup}>

            <label style={styles.label}>
              SERVICE / KVM
            </label>

            <input
              type="text"
              placeholder="e.g. KVM-1"
              value={service}
              onChange={(e) =>
                setService(
                  e.target.value
                )
              }
              style={styles.input}
            />

          </div>

          {/* BUTTON */}

          <button
            onClick={handleAdd}
            disabled={isLoading}
            style={{
              ...styles.button,
              opacity:
                isLoading ? 0.7 : 1,
            }}
          >

            {
              isLoading
                ? "Saving..."
                : "Confirm & Save Port"
            }

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
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",
  },

  toast: {
    position: "fixed",
    top: "25px",
    right: "25px",
    color: "#fff",
    padding: "16px 24px",
    borderRadius: "14px",
    fontWeight: "700",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
    zIndex: 9999,
    animation:
      "slideIn 0.4s ease",
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
    background: "#22c55e",
  },

};

export default AddPort;