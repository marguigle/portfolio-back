import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "./config/database.js";
import personaRouter from "./routes/personaRouter.js";
import expLaboralRouter from "./routes/expLaboralRouter.js";
import estudiosRouter from "./routes/estudiosRouter.js";
import actDocenteRouter from "./routes/actDocenteRouter.js";
import congresosRouter from "./routes/congresosRouter.js";
import hardSkillsRouter from "./routes/hardSkillsRouter.js";
import proyectosRouter from "./routes/proyectosRouter.js";
dotenv.config();
const app = express();

// Enable CORS for all origins - required for frontend access
app.use(cors({
  origin: "*",
  credentials: false
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "bienvenido a mi servidor", status: "ok" });
});

app.use("/api", personaRouter);
app.use("/api", expLaboralRouter);
app.use("/api", estudiosRouter);
app.use("/api", actDocenteRouter);
app.use("/api", congresosRouter);
app.use("/api", hardSkillsRouter);
app.use("/api", proyectosRouter);

app.listen(process.env.PORT, () => {
  console.log("server running on port " + process.env.PORT);
});
