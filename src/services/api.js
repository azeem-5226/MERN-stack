import axios from "axios";

// =========================
// PORT API
// =========================
const API = axios.create({
  baseURL: "http://localhost:5000/api/ports"
});

// =========================
// AUTH API
// =========================
const AUTH_API = axios.create({
  baseURL: "http://localhost:5000/api/auth"
});


// =========================
// PORT APIs
// =========================

// ➕ Add Port
export const addPort = (data) =>
  API.post("/", data);

// 🔍 Search Port
export const searchPort = (port) =>
  API.get(`/${port}`);

// 📋 Get All Ports
export const getAllPorts = () =>
  API.get("/");

// ✏️ Update Port
export const updatePort = (port, data) =>
  API.put(`/${port}`, data);

// ❌ Delete Port
export const deletePort = (port) =>
  API.delete(`/${port}`);


// =========================
// AUTH APIs
// =========================

// ✅ Signup
export const signupUser = (data) =>
  AUTH_API.post("/signup", data);

// ✅ Login
export const loginUser = (data) =>
  AUTH_API.post("/login", data);

// ✅ Forgot Password
export const forgotPassword = (data) =>
  AUTH_API.put(
    "/forgot-password",
    data
  );