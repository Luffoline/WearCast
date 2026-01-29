import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather_routes.mjs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
