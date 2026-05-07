import React, {
  useState,
  useEffect
} from "react";

import {
  searchPort,
  getAllPorts,
  deletePort,
  updatePort
} from "../services/api";

function SearchPort({ refresh }) {

  const [portNumber, setPortNumber] =
    useState("");

  const [data, setData] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(false);

  // REALTIME FETCH

  useEffect(() => {

    fetchAll();

  }, [refresh]);

  // FETCH ALL PORTS

  const fetchAll = async () => {

    setIsLoading(true);

    try {

      const res =
        await getAllPorts();

      setData(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setIsLoading(false);

    }
  };

  // SEARCH

  const handleSearch = async () => {

    if (!portNumber) {

      fetchAll();
      return;

    }

    try {

      const res =
        await searchPort(portNumber);

      setData(
        res.data ? [res.data] : []
      );

    } catch {

      setData([]);

    }
  };

  // DELETE

  const handleDelete = async (port) => {

    const confirmDelete =
      window.confirm(
        "Delete this port?"
      );

    if (!confirmDelete) return;

    try {

      await deletePort(port);

      alert(
        "Deleted Successfully ✅"
      );

      fetchAll();

    } catch (err) {

      alert("Delete Error ❌");

    }
  };

  // EDIT

  const handleEdit = async (item) => {

    const newServer =
      prompt(
        "Enter Server Name",
        item.serverName
      );

    const newPort =
      prompt(
        "Enter Port Number",
        item.portNumber
      );

    const newWebsite =
      prompt(
        "Enter Website",
        item.website
      );

    const newService =
      prompt(
        "Enter Service/KVM",
        item.service
      );

    if (
      !newServer ||
      !newPort ||
      !newWebsite ||
      !newService
    ) return;

    try {

      await updatePort(
        item.portNumber,
        {
          serverName: newServer,
          portNumber:
            Number(newPort),
          website: newWebsite,
          service: newService,
        }
      );

      alert(
        "Updated Successfully ✅"
      );

      fetchAll();

    } catch (err) {

      alert("Update Error ❌");

    }
  };

  return (

    <div style={styles.pageWrapper}>

      {/* ANIMATION */}

      <style>

        {`

          @keyframes slideUp {

            from {

              opacity: 0;
              transform: translateY(20px);

            }

            to {

              opacity: 1;
              transform: translateY(0);

            }

          }

          .animate-in {

            animation:
              slideUp 0.5s ease forwards;

          }

          .table-row {

            transition: 0.2s;

          }

          .table-row:hover {

            background-color:
              #f8fafc;

          }

        `}

      </style>

      <div
        style={styles.container}
        className="animate-in"
      >

        {/* HEADER */}

        <header style={styles.header}>

          <h2 style={styles.heading}>
            🚀 Port Management Dashboard
          </h2>

          <p style={styles.subHeading}>
            Centralized Infrastructure
            Monitoring
          </p>

        </header>

        {/* SEARCH */}

        <div style={styles.searchBox}>

          <input
            type="number"
            placeholder="Search Port..."
            value={portNumber}
            onChange={(e) =>
              setPortNumber(
                e.target.value
              )
            }
            style={styles.input}
          />

          <button
            onClick={handleSearch}
            style={styles.searchBtn}
          >
            Search
          </button>

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
                      className="table-row"
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
                              handleEdit(item)
                            }
                            style={styles.editBtn}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                item.portNumber
                              )
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

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "8px",
  },

  subHeading: {
    color: "#64748b",
  },

  searchBox: {
    display: "flex",
    gap: "12px",
    marginBottom: "25px",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #dbeafe",
    background: "#f8fafc",
    outline: "none",
    fontSize: "15px",
  },

  searchBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "14px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
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
    fontSize: "13px",
    color: "#64748b",
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