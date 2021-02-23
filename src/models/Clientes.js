const { Schema, model } = require("mongoose");

const ClientesSchema = new Schema({
	nombre: {
		type: String,
		trim: true,
	},
	apellido: {
		type: String,
		trim: true,
	},
	empresa: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		lowercase: true,
	},
	telefono: {
		type: String,
		trim: true,
	},
});

module.exports = model("clientes", ClientesSchema);
