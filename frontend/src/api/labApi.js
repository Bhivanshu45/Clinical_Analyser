import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});


export async function analyzeLabs(data) {
  const response = await api.post(
    "/api/analysis/",
    data
  );

  return response.data;
}