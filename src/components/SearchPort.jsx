import React, {
  useState,
  useEffect
} from "react";

import {
  getAllPorts,
  deletePort,
  updatePort
} from "../services/api";

function SearchPort({ refresh }) {

  const [searchText, setSearchText] =
    useState("");

  const [data, setData] =
    useState([]);

  const [allData, setAllData] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(false);

  // TOAST

  const [toast, setToast] =
    useState({
      show: false,
      message: "",
      type: "success",
    });

  // DELETE MODAL

  const [deleteModal, setDeleteModal] =
    useState({
      open: false,
      port: null,
    });

  // EDIT MODAL

  const [editModal, setEditModal] =
    useState({
      open: false,
      data: null,
    });

  // EDIT FORM

  const [editForm, setEditForm] =
    useState({
      serverName: "",
      portNumber: "",
      website: "",
      service: "",
    });

  // TOAST

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

  // FETCH

  useEffect(() => {

    fetchAll();

  }, [refresh]);

  const fetchAll = async () => {

    setIsLoading(true);

    try {

      const res =
        await getAllPorts();

      setData(res.data);

      setAllData(res.data);

    } catch (err) {

      showToast(
        "Failed to load data ❌",
        "error"
      );

    } finally {

      setIsLoading(false);

    }

  };

  // SEARCH

  const handleSearch = (
    value
  ) => {

    setSearchText(value);

    if (!value.trim()) {

      setData(allData);
      return;

    }

    const search =
      value.toLowerCase();

    const filtered =
      allData.filter((item) => {

        return (

          item.serverName
            ?.toLowerCase()
            .includes(search)

          ||

          item.website
            ?.toLowerCase()
            .includes(search)

          ||

          item.service
            ?.toLowerCase()
            .includes(search)

          ||

          String(
            item.portNumber
          ).includes(search)

        );

      });

    setData(filtered);

  };

  // DELETE

  const confirmDelete =
    async () => {

      try {

        const res =
          await deletePort(
            deleteModal.port
          );

        showToast(
          res.data.message ||
          "Deleted Successfully ✅"
        );

        setDeleteModal({
          open: false,
          port: null,
        });

        fetchAll();

      } catch (err) {

        showToast(
          "Delete Failed ❌",
          "error"
        );

      }

    };

  // OPEN EDIT

  const openEditModal = (
    item
  ) => {

    setEditModal({
      open: true,
      data: item,
    });

    setEditForm({

      serverName:
        item.serverName,

      portNumber:
        item.portNumber,

      website:
        item.website,

      service:
        item.service,

    });

  };

  // UPDATE

  const handleUpdate =
    async () => {

      try {

        const res =
          await updatePort(
            editModal.data.portNumber,
            {
              ...editForm,
              portNumber:
                Number(
                  editForm.portNumber
                ),
            }
          );

        showToast(
          res.data.message ||
          "Updated Successfully ✅"
        );

        setEditModal({
          open: false,
          data: null,
        });

        fetchAll();

      } catch (err) {

        const errorMessage =
          err.response?.data?.message ||
          "Update Failed ❌";

        showToast(
          errorMessage,
          "error"
        );

      }

    };

  return (

    <div style={styles.pageWrapper}>

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

            {toast.message}

          </div>

        )

      }

      {/* DELETE MODAL */}

      {

        deleteModal.open && (

          <div style={styles.overlay}>

            <div style={styles.modal}>

              <h2 style={styles.modalTitle}>
                Delete Port
              </h2>

              <p style={styles.modalText}>
                Are you sure you want
                to delete this port?
              </p>

              <div style={styles.modalButtons}>

                <button
                  onClick={() =>
                    setDeleteModal({
                      open: false,
                      port: null,
                    })
                  }
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>

                <button
                  onClick={
                    confirmDelete
                  }
                  style={styles.deleteConfirmBtn}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )

      }

      {/* EDIT MODAL */}

      {

        editModal.open && (

          <div style={styles.overlay}>

            <div style={styles.modal}>

              <h2 style={styles.modalTitle}>
                Edit Port
              </h2>

              <div style={styles.formGroup}>

                <input
                  type="text"
                  placeholder="Server Name"
                  value={
                    editForm.serverName
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      serverName:
                        e.target.value,
                    })
                  }
                  style={styles.modalInput}
                />

                <input
                  type="number"
                  placeholder="Port Number"
                  value={
                    editForm.portNumber
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      portNumber:
                        e.target.value,
                    })
                  }
                  style={styles.modalInput}
                />

                <input
                  type="text"
                  placeholder="Website"
                  value={
                    editForm.website
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      website:
                        e.target.value,
                    })
                  }
                  style={styles.modalInput}
                />

                <input
                  type="text"
                  placeholder="KVM"
                  value={
                    editForm.service
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      service:
                        e.target.value,
                    })
                  }
                  style={styles.modalInput}
                />

              </div>

              <div style={styles.modalButtons}>

                <button
                  onClick={() =>
                    setEditModal({
                      open: false,
                      data: null,
                    })
                  }
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleUpdate
                  }
                  style={styles.saveBtn}
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        )

      }

      {/* ANIMATION */}

      <style>

        {`

.table-scroll::-webkit-scrollbar {

  width: 8px;

}

.table-scroll::-webkit-scrollbar-track {

  background: #f1f5f9;

}

.table-scroll::-webkit-scrollbar-thumb {

  background: #cbd5e1;
  border-radius: 20px;

}

.table-scroll::-webkit-scrollbar-thumb:hover {

  background: #94a3b8;

}


          @keyframes slideUp {

            from {

              opacity: 0;
              transform:
                translateY(20px);

            }

            to {

              opacity: 1;
              transform:
                translateY(0);

            }

          }

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

        <header style={styles.header}>

          <h2 style={styles.heading}>
            🚀 Port Management Dashboard
          </h2>

          <p style={styles.subHeading}>
            Centralized Infrastructure Monitoring
          </p>

        </header>

        {/* SEARCH */}

        <div style={styles.searchBox}>

          <input
            type="text"
            placeholder="Search Port / Server / Website / KVM"
            value={searchText}
            onChange={(e) =>
              handleSearch(
                e.target.value
              )
            }
            style={styles.input}
          />

        </div>

        {/* TABLE */}

        <div style={styles.tableCard}>

          <table style={styles.table}>

            <thead>

              <tr style={styles.theadRow}>

                <th style={styles.th}>
                  SERVER
                </th>

                <th style={styles.th}>
                  PORT
                </th>

                <th style={styles.th}>
                  WEBSITE
                </th>

                <th style={styles.th}>
                  KVM
                </th>

                <th style={styles.th}>
                  ACTIONS
                </th>

              </tr>

            </thead>

            <tbody>

              {

                data.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      style={styles.noData}
                    >

                      {

                        isLoading
                          ? "Loading..."
                          : "No Records Found"

                      }

                    </td>

                  </tr>

                ) : (

                  data.map((item) => (

                    <tr
                      key={item._id}
                    >

                      <td style={styles.td}>
                        {item.serverName}
                      </td>

                      <td style={styles.td}>

                        <span style={styles.portBadge}>
                          {item.portNumber}
                        </span>

                      </td>

                      <td style={styles.td}>
                        {item.website}
                      </td>

                      <td style={styles.td}>
                        {item.service}
                      </td>

                      <td style={styles.td}>

                        <div style={styles.actionGroup}>

                          <button
                            onClick={() =>
                              openEditModal(item)
                            }
                            style={styles.editBtn}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              setDeleteModal({
                                open: true,
                                port:
                                  item.portNumber,
                              })
                            }
                            style={styles.deleteBtn}
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

const styles = {

  pageWrapper: {
    width: "100%",
  },

  container: {
    width: "100%",
  },

  toast: {
    position: "fixed",
    top: "25px",
    right: "25px",
    color: "#fff",
    padding: "16px 24px",
    borderRadius: "14px",
    fontWeight: "700",
    zIndex: 9999,
    animation:
      "slideIn 0.4s ease",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modal: {
    width: "420px",
    background:
      "linear-gradient(135deg,#0f172a,#111827)",
    padding: "30px",
    borderRadius: "22px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.5)",
    animation:
      "slideUp 0.3s ease",
  },

  modalTitle: {
    color: "#fff",
    marginBottom: "14px",
    fontSize: "28px",
    fontWeight: "800",
  },

  modalText: {
    color: "#cbd5e1",
    marginBottom: "25px",
  },

  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "20px",
  },

  cancelBtn: {
    background:
      "rgba(255,255,255,0.08)",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    cursor: "pointer",
  },

  deleteConfirmBtn: {
    background:
      "linear-gradient(to right,#ef4444,#dc2626)",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
  },

  saveBtn: {
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  modalInput: {
    background:
      "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    padding: "14px",
    borderRadius: "12px",
    outline: "none",
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#0f172a",
  },

  subHeading: {
    color: "#64748b",
  },

  searchBox: {
    marginBottom: "25px",
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

 tableCard: {
  background: "#fff",
  borderRadius: "18px",
  overflowY: "auto",
  overflowX: "hidden",

  maxHeight: "600px",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.05)",

  scrollbarWidth: "thin",

},

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  theadRow: {
    background: "#f8fafc",
  },

  th: {
    padding: "18px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "13px",
  },

  td: {
    padding: "18px",
    textAlign: "center",
    borderTop:
      "1px solid #f1f5f9",
  },

  portBadge: {
    background: "#dbeafe",
    color: "#2563eb",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "700",
  },

  actionGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  editBtn: {
    background: "#facc15",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },

  noData: {
    padding: "60px",
    textAlign: "center",
    color: "#94a3b8",
  },

};

export default SearchPort;