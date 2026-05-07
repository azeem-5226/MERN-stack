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

  // TOAST

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

    // VALIDATION

    if (
      !serverName.trim() ||
      !portNumber.trim() ||
      !website.trim() ||
      !service.trim()
    ) {

      showToast(
        "Please fill all fields ❌",
        "error"
      );

      return;

    }

    // PORT VALIDATION

    if (
      Number(portNumber) < 1
    ) {

      showToast(
        "Invalid Port Number ❌",
        "error"
      );

      return;

    }

    setIsLoading(true);

    try {

      const res =
        await addPort({

          serverName:
            serverName.trim(),

          portNumber:
            Number(portNumber),

          website:
            website.trim(),

          service:
            service.trim(),

        });

      // CLEAR FORM

      setServerName("");
      setPortNumber("");
      setWebsite("");
      setService("");

      // SUCCESS

      showToast(
        res.data.message ||
        "Port Registered Successfully ✅",
        "success"
      );

      // REALTIME REFRESH

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
                toast.type ===
                  "success"

                  ?

                  "linear-gradient(to right,#22c55e,#16a34a)"

                  :

                  "linear-gradient(to right,#ef4444,#dc2626)",
            }}
          >

            <div style={styles.toastContent}>

              <span>

                {

                  toast.type ===
                    "success"

                    ?

                    "✅"

                    :

                    "❌"

                }

              </span>

              <span>
                {toast.message}
              </span>

            </div>

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

          @keyframes pulse {

            0% {

              transform: scale(1);

            }

            50% {

              transform: scale(1.05);

            }

            100% {

              transform: scale(1);

            }

          }

        `}

      </style>

      <div style={styles.container}>

        {/* HEADER */}

        <div style={styles.header}>

          <div style={styles.iconCircle}>
            ⚡
          </div>

          <h2 style={styles.title}>
            Register New Port
          </h2>

          <p style={styles.subtitle}>
            Configure server ports and infrastructure routing
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

          {/* KVM */}

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
                isLoading
                  ? 0.7
                  : 1,

              cursor:
                isLoading
                  ? "not-allowed"
                  : "pointer",
            }}
          >

            {

              isLoading

                ?

                "Saving Port..."

                :

                "Confirm & Save Port"

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
    background: "#ffffff",
    width: "100%",
    maxWidth: "480px",
    borderRadius: "24px",
    padding: "35px",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.08)",
    border:
      "1px solid #f1f5f9",
  },

  toast: {
    position: "fixed",
    top: "25px",
    right: "25px",
    color: "#fff",
    padding: "16px 22px",
    borderRadius: "16px",
    fontWeight: "700",
    zIndex: 9999,
    animation:
      "slideIn 0.4s ease",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  },

  toastContent: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  header: {
    textAlign: "center",
    marginBottom: "28px",
  },

  iconCircle: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    fontSize: "28px",
    color: "#fff",
    marginBottom: "18px",
    animation:
      "pulse 2s infinite",
  },

  title: {
    margin: 0,
    fontSize: "34px",
    fontWeight: "900",
    color: "#0f172a",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "10px",
    fontSize: "15px",
    lineHeight: "1.6",
  },

  formBody: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  inputGroup: {
    textAlign: "left",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#475569",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "1px",
  },

  input: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #dbeafe",
    background: "#f8fafc",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    transition: "0.2s",
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "800",
    background:
      "linear-gradient(to right,#22c55e,#16a34a)",
    boxShadow:
      "0 10px 25px rgba(34,197,94,0.25)",
    transition: "0.3s",
  },

};

export default AddPort;