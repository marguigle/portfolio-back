import { Schema, model } from "mongoose";

const hardSkillsSchema = new Schema(
  {
    skill: { type: String },
    tecnologia: { type: String },
    nivel: { type: String },
    porcentaje: { type: Number },
  },
  {
    timestamps: true,
  }
);
const HardSkillsModel = model("hardSkills", hardSkillsSchema);

export default HardSkillsModel;
