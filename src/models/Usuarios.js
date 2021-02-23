const {Schema,model} = require("mongoose");

const UsuariosSchema = new Schema({
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    nombre:{
        type:String,
        required: "Agrega tu nombre"
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = model("usuarios",UsuariosSchema)