import { Schema, model } from "mongoose";

const cursosSchema = new Schema({
  nombre: { type: String, required: true },
  tecnologia: { type: String },
  lugar: { type: String },
  imgUrl: { type: String },
}, { timestamps: true });

const CursosModel = model("cursos", cursosSchema);

export default CursosModel;
