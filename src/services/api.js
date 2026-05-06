import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/ports"
});

// ➕ Add Port
export const addPort = (data) => API.post("/", data);

// 🔍 Search Port
export const searchPort = (port) => API.get(`/${port}`);

// 📋 Get All Ports
export const getAllPorts = () => API.get("/");

// ✏️ Update Port
export const updatePort = (port, data) => API.put(`/${port}`, data);

// ❌ Delete Port
export const deletePort = (port) => API.delete(`/${port}`);