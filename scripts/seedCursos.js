import "dotenv/config.js";
import mongoose from "mongoose";
import CursosModel from "../models/CursosModel.js";

const cursos = [
  {
    nombre: "React: De cero a experto",
    tecnologia: "React, JavaScript, Hooks",
    lugar: "Udemy",
  },
  {
    nombre: "Node.js - API RESTful con Express",
    tecnologia: "Node.js, Express, MongoDB",
    lugar: "Platzi",
  },
  {
    nombre: "Tailwind CSS: Diseño moderno",
    tecnologia: "Tailwind CSS, CSS3",
    lugar: "FreeCodeCamp",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Conectado a MongoDB");

    await CursosModel.deleteMany({});
    console.log("Cursos anteriores eliminados");

    await CursosModel.insertMany(cursos);
    console.log("Cursos insertados:");

    const count = await CursosModel.countDocuments();
    console.log(`Total de cursos: ${count}`);

    const inserted = await CursosModel.find();
    inserted.forEach((c) => console.log(`  - ${c.nombre} (${c.tecnologia})`));
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

seed();
