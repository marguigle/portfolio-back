import CursosModel from "../models/CursosModel.js";

const cursosController = {
  getCursos: async (req, res) => {
    try {
      const cursos = await CursosModel.find();
      res.json({ response: cursos, success: true, error: null });
    } catch (error) {
      res.status(500).json({ message: "No se han podido encontrar los cursos" });
    }
  },

  getOneCurso: async (req, res) => {
    try {
      const curso = await CursosModel.findById(req.params.id);
      if (!curso) return res.status(404).json({ message: "Curso no encontrado" });
      res.json({ response: curso, success: true, error: null });
    } catch (error) {
      res.status(500).json({ message: "No se ha podido encontrar el curso" });
    }
  },

  createCurso: async (req, res) => {
    try {
      const curso = await CursosModel.create(req.body);
      res.json({ response: curso, success: true, error: null, status: 200, message: "Curso creado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "No se ha podido guardar el curso" });
    }
  },

  updateCurso: async (req, res) => {
    try {
      const cursoActualizado = await CursosModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ response: cursoActualizado, success: true, error: null, message: "Curso actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "No se ha podido actualizar el curso" });
    }
  },

  deleteCurso: async (req, res) => {
    try {
      const curso = await CursosModel.findByIdAndDelete(req.params.id);
      if (!curso) return res.status(404).json({ message: "Curso no encontrado" });
      res.json({ success: true, message: "Curso eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "No se ha podido eliminar el curso" });
    }
  },
};

export default cursosController;
