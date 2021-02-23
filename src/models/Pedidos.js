const { Schema, model } = require("mongoose");

const PedidosSchema = new Schema({
	cliente: {
		type: Schema.Types.ObjectId,
		ref: "clientes",
	},
	pedido: [
		{
			producto: {
				type: Schema.Types.ObjectId,
				ref: "productos",
			},
			cantidad: Number,
		},
	],
	total: {
		type: Number,
	},
});

module.exports = model("pedidos", PedidosSchema);
