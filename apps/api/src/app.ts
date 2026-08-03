import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => {
  res.json({
    status: "OK",
    service: "Starter Platform API"
  });
});

export default app;