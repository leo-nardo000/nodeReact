const {Schema,model} = require("mongoose");

const ProductosSchema = new Schema({
    nombre: {
        type:String,
        trim:true
    },
    precio: {
        type:Number,
    },
    imagen:{
        type:String
    }
});

module.exports = model("productos",ProductosSchema);