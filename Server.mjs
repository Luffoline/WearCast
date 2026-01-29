import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather_routes.mjs";
import authRoutes from "./routes/account_actions.mjs";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(
  session({
    secret: "dev-secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.json());

app.get("/",(req, res, next) =>{
  res.send("server kjører")
});

app.use("/api/weather", weatherRoutes);

app.use("/account", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
