import cors from "cors";
import express from "express";

import userRoutes from "./modules/user/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Starter Platform API",
  });
});

app.use("/api/users", userRoutes);

export default app;