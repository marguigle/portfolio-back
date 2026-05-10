 import mongoose from "mongoose"
 import PersonaModel from "../models/PersonaModel.js"
 
 const personaController= {
    getPersona : async(req,res)=>{
        let  personas
        let success
        let error
        const { rol } = req.query

        try {
        const filter = rol ? { rol } : {}
        personas = await PersonaModel.find(filter)
        res.json(
            {response:personas,
             success:true,
             error:null,
          
          })
        } catch (error) {
            res.error({message:"no se ha podido encontrar la persona buscada"})
        }
    },

    deletePersona: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(`ID recibido: ${id}`);

            // Verificar si el ID es válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                console.log("ID no es válido");
                return res.status(400).json({
                    message: "ID inválido",
                    success: false,
                    error: "El ID proporcionado no es un ObjectId válido",
                });
            }

            console.log("ID es válido, procediendo a buscar y eliminar la persona");
            const persona = await PersonaModel.findByIdAndDelete(id);
            console.log(`Resultado de findByIdAndDelete: ${persona}`);

            if (!persona) {
                console.log("No se encontró una persona con el ID proporcionado");
                return res.status(404).json({
                    message: "La persona no fue encontrada",
                    success: false,
                    error: "No se encontró una persona con el ID proporcionado",
                });
            }

            console.log("La persona se borró correctamente");
            res.json({
                message: "La persona se borró correctamente",
                success: true,
                error: null,
            });
        } catch (error) {
            console.error(`Error al borrar la persona: ${error.message}`);
            res.status(500).json({
                message: "Error al borrar la persona",
                success: false,
                error: error.message,
            });
        }
    },

    updatePersona:async(req,res)=>{
       
        try {
            const { id } = req.params;
            console.log(`ID recibido: ${id}`);

            // Verificar si el ID es válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                console.log("ID no es válido");
                return res.status(400).json({
                    message: "ID inválido",
                    success: false,
                    error: "El ID proporcionado no es un ObjectId válido",
                });
            }

            console.log("ID es válido, procediendo a buscar y actualizar la persona");
            const datosActualizados = req.body;
            const persona = await PersonaModel.findByIdAndUpdate(id,datosActualizados,{new:true});
            console.log(`Resultado de findByIdAndUpdate: ${persona}`);

            if (!persona) {
                console.log("No se encontró una persona con el ID proporcionado");
                return res.status(404).json({
                    message: "La persona no fue encontrada",
                    success: false,
                    error: "No se encontró una persona con el ID proporcionado",
                });
            }

            console.log("La persona se actualizo correctamente");
            res.json({
                message: "La persona se actualizo correctamente",
                success: true,
                data:persona
            });
        } catch (error) {
            console.error(`Error al actualizar la persona: ${error.message}`);
            res.status(500).json({
                message: "Error al actualizar la persona",
                success: false,
                error: error.message,
            });
        }


    }
,
    createPersona:async(req,res)=>{
        let persona
        try {
         persona= PersonaModel.create(req.body)
         res.json(
          {response:persona,
           status:200,
           error:null,
           message:"los datos de la persona se han cargado correctamente"
        })
        //   console.log(persona)
        //   console.log("los datos de la persona se han cargado correctamente")

        } catch (error) {
            res.error({message:"no se ha podido cargar los datos de la persona"})
        }
    }

}
export   default personaController