import express from "express";
import UserModel from "../models/UserModel.js";
import { authenticate, generateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/me", authenticate, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      rol: req.user.rol
    }
  });
});

router.put("/change-password", authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Ambas contraseñas son requeridas" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "La contraseña actual no es correcta" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.put("/change-email", authenticate, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase(), _id: { $ne: user._id } });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    user.email = email.toLowerCase();
    await user.save();

    res.json({
      message: "Email actualizado exitosamente",
      user: { id: user._id, email: user.email, rol: user.rol }
    });
  } catch (error) {
    console.error("Change email error:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/setup", async (req, res) => {
  try {
    const existingAdmin = await UserModel.findOne({ rol: "admin" });
    if (existingAdmin) {
      return res.status(403).json({ message: "Ya existe un administrador. Usa el endpoint de login." });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    const user = new UserModel({
      email: email.toLowerCase(),
      password,
      rol: "admin"
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Administrador creado exitosamente",
      token,
      user: {
        id: user._id,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error("Setup error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;