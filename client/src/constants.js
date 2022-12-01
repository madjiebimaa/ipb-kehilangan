export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://ipb-kehilangan.up.railway.app"
    : "http://localhost:3001";
