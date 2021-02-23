const Clientes = require("../models/Clientes");

exports.nuevoCliente = async (req, res, next) => {
	const cliente = new Clientes(req.body);

	try {
		await cliente.save();
		res.json({ msg: "Se agrego un nuevo Cliente" });
	} catch (error) {
		res.send(error);
		next();
	}
};

exports.mostrarClientes = async (req, res, next) => {
	try {
		const clientes = await Clientes.find({});
		res.json(clientes);
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.mostrarCliente = async (req, res, next) => {
	try {
		const cliente = await Clientes.find({ _id: req.params.id });
		if(!cliente.length){
			res.status(400).send("Ese Cliente no existe");
			return next();
		}
		res.json(cliente);
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.actualizarCliente = async (req, res, next) => {
	try {
		const cliente = await Clientes.findByIdAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true }
		);
		res.json({msg:"Cliente Actualizado Correctamente"});
	} catch (error) {
		res.status(400).send(error);
		next();
	}
};

exports.eliminarCliente = async (req, res, next) => {
	try {
		await Clientes.findOneAndDelete({ _id: req.params.id });
		res.json({msg:"Cliente Eliminado"});
	} catch (error) {
		res.send(error);
		next();
	}
};
