import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key_portfolio_marcelo_2024";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado, token requerido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    }
    return res.status(500).json({ message: "Error de autenticación" });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autorizado" });
  }
  if (req.user.rol !== "admin") {
    return res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador" });
  }
  next();
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};