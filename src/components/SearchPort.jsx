import { useState, useEffect } from "react";
import {
  searchPort,
  getAllPorts,
  deletePort,
  updatePort
} from "../services/api";

function SearchPort() {
  const [portNumber, setPortNumber] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const res = await getAllPorts();
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    if (!portNumber) {
      fetchAll();
      return;
    }

    try {
      const res = await searchPort(portNumber);
      setData([res.data]);
    } catch {
      setData([]);
    }
  };

  // DELETE
  const handleDelete = async (port) => {
    if (window.confirm("Delete this port?")) {
      try {
        await deletePort(port);
        fetchAll();
      } catch (err) {
        alert("Delete Error ❌");
      }
    }
  };

  // EDIT
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
    <div style={styles.container}>
      <h2 style={styles.heading}>🚀 Port Management Dashboard</h2>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <input
          type="number"
          placeholder="Search Port Number..."
          value={portNumber}
          onChange={(e) => setPortNumber(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSearch} style={styles.searchBtn}>
          Search
        </button>
      </div>

      {/* TABLE */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Server</th>
              <th>Port</th>
              <th>Website</th>
              <th>Service / KVM</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.noData}>
                  No Data Found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.serverName}</td>

                  <td>
                    <span style={styles.portBadge}>
                      {item.portNumber}
                    </span>
                  </td>

                  <td>{item.website}</td>

                  <td>{item.service}</td>

                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.portNumber)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "20px",
  },

  heading: {
    fontSize: "28px",
    marginBottom: "25px",
    color: "#0f172a",
    textAlign: "center",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #dbeafe",
    fontSize: "15px",
    outline: "none",
  },

  searchBtn: {
    padding: "14px 25px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
  },

  tableContainer: {
    overflowX: "auto",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  noData: {
    padding: "30px",
    textAlign: "center",
    color: "#64748b",
  },

  portBadge: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: "700",
  },

  editBtn: {
    background: "#facc15",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    marginRight: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default SearchPort;