import React, { useState, useEffect } from "react";
import { searchPort, getAllPorts, deletePort, updatePort } from "../services/api";

function SearchPort() {
  const [portNumber, setPortNumber] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const res = await getAllPorts();
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!portNumber) {
      fetchAll();
      return;
    }
    try {
      const res = await searchPort(portNumber);
      setData(res.data ? [res.data] : []);
    } catch {
      setData([]);
    }
  };

  const handleDelete = async (port) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deletePort(port);
        fetchAll();
      } catch (err) {
        alert("Delete Error ❌");
      }
    }
  };

  const handleEdit = async (item) => {
    const newServer = prompt("Enter Server Name", item.serverName);
    const newPort = prompt("Enter Port Number", item.portNumber);
    const newWebsite = prompt("Enter Website", item.website);
    const newService = prompt("Enter Service/KVM", item.service);

    if (!newServer || !newPort || !newWebsite || !newService) return;

    try {
      await updatePort(item.portNumber, {
        serverName: newServer,
        portNumber: Number(newPort),
        website: newWebsite,
        service: newService,
      });
      fetchAll();
    } catch (err) {
      alert("Update Error ❌");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Dynamic CSS for Hover and Animations */}
      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-in {
            animation: slideUp 0.5s ease forwards;
          }
          .table-row {
            transition: all 0.2s ease;
          }
          .table-row:hover {
            background-color: #f1f5f9 !important;
            transform: scale(1.002);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          .btn-action {
            transition: all 0.2s ease;
          }
          .btn-action:hover {
            filter: brightness(0.9);
            transform: translateY(-1px);
          }
          .btn-action:active {
            transform: translateY(0);
          }
        `}
      </style>

      <div style={styles.container} className="animate-in">
        <header style={styles.header}>
          <h2 style={styles.heading}>🚀 Port Management Dashboard</h2>
          <p style={styles.subHeading}>Centralized infrastructure monitoring system</p>
        </header>

        {/* SEARCH BOX */}
        <div style={styles.searchBox}>
          <div style={styles.inputContainer}>
            <input
              type="number"
              placeholder="Search Port Number (e.g., 3000)"
              value={portNumber}
              onChange={(e) => setPortNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              style={styles.input}
            />
          </div>
          <button onClick={handleSearch} style={styles.searchBtn} className="btn-action">
            Search Records
          </button>
        </div>

        {/* DATA TABLE */}
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={styles.th}>SERVER NAME</th>
                <th style={styles.th}>PORT</th>
                <th style={styles.th}>WEBSITE</th>
                <th style={styles.th}>SERVICE</th>
                <th style={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="5" style={styles.noData}>
                    {isLoading ? "Fetching data from server..." : "No records found matching your search."}
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index} className="table-row" style={styles.tr}>
                    <td style={styles.td}>
                      <span style={styles.serverText}>{item.serverName}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.portBadge}>{item.portNumber}</span>
                    </td>
                    <td style={styles.td}>
                      <a href={`http://${item.website}`} target="_blank" rel="noreferrer" style={styles.link}>
                        {item.website}
                      </a>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.serviceTag}>{item.service}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionGroup}>
                        <button
                          onClick={() => handleEdit(item)}
                          style={styles.editBtn}
                          className="btn-action"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.portNumber)}
                          style={styles.deleteBtn}
                          className="btn-action"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "50px 20px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1a202c",
    margin: "0 0 10px 0",
    letterSpacing: "-0.5px",
  },
  subHeading: {
    fontSize: "16px",
    color: "#718096",
    margin: 0,
  },
  searchBox: {
    display: "flex",
    gap: "15px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
    marginBottom: "30px",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "10px",
    border: "2px solid #edf2f7",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  searchBtn: {
    backgroundColor: "#2b6cb0",
    color: "white",
    border: "none",
    padding: "14px 30px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px",
  },
  tableCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  theadRow: {
    backgroundColor: "#f8fafc",
    borderBottom: "2px solid #edf2f7",
  },
  th: {
    padding: "20px",
    fontSize: "12px",
    fontWeight: "800",
    color: "#4a5568",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    textAlign: "center", // CENTERED
  },
  tr: {
    borderBottom: "1px solid #edf2f7",
    backgroundColor: "#ffffff",
  },
  td: {
    padding: "18px 20px",
    fontSize: "14px",
    color: "#2d3748",
    textAlign: "center", // CENTERED
    verticalAlign: "middle",
  },
  serverText: {
    fontWeight: "600",
    color: "#1a202c",
  },
  portBadge: {
    backgroundColor: "#ebf8ff",
    color: "#2b6cb0",
    padding: "6px 14px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontFamily: "monospace",
    border: "1px solid #bee3f8",
  },
  link: {
    color: "#3182ce",
    textDecoration: "none",
    fontWeight: "500",
  },
  serviceTag: {
    backgroundColor: "#f7fafc",
    color: "#4a5568",
    padding: "5px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    border: "1px solid #e2e8f0",
  },
  actionGroup: {
    display: "flex",
    gap: "8px",
    justifyContent: "center", // CENTERED
  },
  editBtn: {
    backgroundColor: "#faf089",
    color: "#744210",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "13px",
  },
  deleteBtn: {
    backgroundColor: "#fed7d7",
    color: "#9b2c2c",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "13px",
  },
  noData: {
    padding: "80px",
    textAlign: "center",
    color: "#a0aec0",
    fontSize: "16px",
    fontWeight: "500",
  },
};

export default SearchPort;