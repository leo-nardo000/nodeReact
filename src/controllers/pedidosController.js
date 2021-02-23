const Pedidos = require("../models/Pedidos");

exports.nuevoPedido = async (req, res, next) => {
	const pedido = new Pedidos(req.body);

	try {
		await pedido.save();
		res.json({ msg: "Se Agrego un Nuevo Pedido" });
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.mostrarPedidos = async (req, res, next) => {
	try {
		const pedidos = await Pedidos.find()
			.populate("cliente")
			.populate({ path: "pedido.producto", model: "productos" });
		res.json(pedidos);
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.mostrarPedido = async (req, res, next) => {
	try {
		const pedido = await Pedidos.findById(req.params.id)
			.populate("cliente")
			.populate({ path: "pedido.producto", model: "productos" });
		if (!pedido) {
			res.json({ msg: "Ese pedido no existe" });
			return next();
		}
		res.json(pedido);
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.actualizarPedido = async (req, res, next) => {
	try {
		let pedido = await Pedidos.findById(req.params.id);
		if (!pedido) {
			return next();
		}
		pedido = await Pedidos.findOneAndUpdate({ _id: req.params.id }, req.body, {
			new: true,
		})
			.populate("cliente")
			.populate({ path: "pedido.producto", model: "productos" });

		res.json(pedido);
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.eliminarPedido = async (req, res, next) => {
	try {
		await Pedidos.findOneAndDelete(req.params.id);
		res.json({ msg: "Pedido Eliminado" });
	} catch (error) {
		console.log(error);
		next();
	}
};
