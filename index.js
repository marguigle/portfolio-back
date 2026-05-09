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
import cursosRouter from "./routes/cursosRouter.js";
import authRouter from "./routes/authRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
dotenv.config();
const app = express();

app.use(cors({
  origin: "*",
  credentials: false
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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
app.use("/api", cursosRouter);
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);

app.listen(process.env.PORT, () => {
  console.log("server running on port " + process.env.PORT);
});