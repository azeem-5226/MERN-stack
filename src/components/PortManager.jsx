import { useEffect, useState } from "react";
import {
  getAllPorts,
  addPort,
  updatePort,
  deletePort
} from "../services/api";

function PortManager() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ portNumber: "", website: "" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAllPorts();
    setData(res.data);
  };

  const handleSubmit = async () => {
    if (!form.portNumber || !form.website) return;

    if (editMode) {
      await updatePort(form.portNumber, { website: form.website });
      setEditMode(false);
    } else {
      await addPort(form);
    }

    setForm({ portNumber: "", website: "" });
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditMode(true);
  };

  const handleDelete = async (port) => {
    await deletePort(port);
    fetchData();
  };

  const filtered = data.filter((item) =>
    item.portNumber.toString().includes(search)
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Port Management System
      </h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          type="number"
          placeholder="Port"
          value={form.portNumber}
          onChange={(e) =>
            setForm({ ...form, portNumber: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Website"
          value={form.website}
          onChange={(e) =>
            setForm({ ...form, website: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editMode ? "Update" : "Add"}
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Live Search Port..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Port</th>
            <th className="p-2">Website</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <tr key={item._id} className="text-center border-t">
              <td className="p-2">{item.portNumber}</td>
              <td className="p-2">{item.website}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.portNumber)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PortManager;