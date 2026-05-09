import "dotenv/config.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("user", userSchema);

const EMAIL = "admin@portfolio.com";
const PASSWORD = "Admin123!";

async function setup() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Conectado a MongoDB");

    const existingAdmin = await User.findOne({ rol: "admin" });
    if (existingAdmin) {
      console.log("Ya existe un administrador:", existingAdmin.email);
      process.exit(0);
    }

    const admin = new User({ email: EMAIL, password: PASSWORD, rol: "admin" });
    await admin.save();
    console.log("Administrador creado exitosamente:");
    console.log("  Email:", EMAIL);
    console.log("  Contraseña:", PASSWORD);
    console.log("\nRecordá cambiar esta contraseña después del primer login!");
  } catch (err) {
    if (err.code === 11000) {
      console.log("El email ya está registrado");
    } else {
      console.error("Error:", err.message);
    }
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

setup();