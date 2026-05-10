import {Schema,model} from "mongoose";

const personaSchema = Schema( {
rol:{type:String, enum:["medico","desarrollador"], default:"medico"},
nombres:{type:String,required:true},
apellidos:{type:String,required:true},
fechaNacimiento:{String},
edad:{type:String},
titulo1:{type:String},
titulo2:{type:String},
acercaDe:{type:String},
imgUrl:{type:String}
},{
    timestamps:true
})

const PersonaModel= model("persona",personaSchema,)

export default PersonaModel