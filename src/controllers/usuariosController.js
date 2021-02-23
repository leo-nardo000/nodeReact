const Usuarios = require("../models/Usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res) => {
	const usuario = new Usuarios(req.body);

	try {
		usuario.password = await bcrypt.hash(req.body.password, 12);
		await usuario.save();
		res.json({ msg: "Usuario creado Correctamente" });
	} catch (error) {
		console.log(error);
		res.json({ msg: "Ese correo ya esta registrado" });
	}
};

exports.autenticarUsuario = async (req, res, next) => {
	try {
		const usuario = await Usuarios.findOne({ email: req.body.email });
		if (!usuario) {
			res.status(400).json({ msg: "Ese usuario no existe" });
			return;
		}
		if (!bcrypt.compareSync(req.body.password, usuario.password)) {
			res.status(400).json({ msg: "Contraseña incorrecta" });
			return;
		}

		// * crear el token
		const token = jwt.sign(
			{
				email: usuario.email,
				nombre: usuario.nombre,
				_id: usuario._id,
			},
			"LLAVESECREATA",
			{
				expiresIn: 3600,
			}
		);

        res.json({token})
	} catch (error) {
		console.log(error);
		next();
	}
};
