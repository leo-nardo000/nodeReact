const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const Productos = require("../models/Productos");

const configuracionMulter = {
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname + "/../public/uploads/"));
		},
		filename: (req, file, next) => {
			const extension = file.mimetype.split("/")[1];
			next(null, `${shortid.generate()}.${extension}`);
		},
	}),
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg"
		) {
			cb(null, true);
			// % el callback se ejecuta como true o false : true cuando la imagen se acepta
		} else {
			cb(new Error("Formato no Valido"));
		}
	},
	limits: { fileSize: 100000 },
};

const upload = multer(configuracionMulter).single("imagen");

exports.subirImagen = (req, res, next) => {
	upload(req, res, function (error) {
		if (error) {
			if (error instanceof multer.MulterError) {
				if (error.code === "LIMIT_FILE_SIZE") {
					return res.json({ msg: "Imagen muy pesada, maximo 100kb" });
				} else {
					return res.json({ msg: error.message });
				}
			} else if (error.hasOwnProperty("message")) {
				return res.json({ msg: error.message });
			}
		}
		next();
	});
};

exports.nuevoProducto = async function (req, res, next) {
	const producto = new Productos(req.body);

	try {
		if (req.file) {
			producto.imagen = req.file.filename;
		}
		await producto.save();
		res.status(200).json({ msg: "Se Agrego un nuevo producto" });
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.mostrarProductos = async function (req, res, next) {
	try {
		const productos = await Productos.find({});
		res.status(200).json(productos);
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.mostrarProducto = async function (req, res, next) {
	try {
		const producto = await Productos.findById(req.params.id);
		if (!producto) {
			res.json({ msg: "Ese producto no existe" });
			return next();
		}
		res.json(producto);
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.buscarProducto = async function (req, res, next) {

	try {
		const producto = await Productos.find({nombre: new RegExp(req.params.query,"i")}).exec();
		if (!producto.length) {
			res.status(400).json({ msg: "Ese producto no existe" });
			return;
		}
		res.json(producto);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Ese producto no existe" });
	}
};

exports.actualizarProducto = async function (req, res, next) {
	try {
		const nuevoProducto = req.body;
		if(req.file){
			nuevoProducto.imagen = req.file.filename;
		} else {
			const productoAnterior = await Productos.findById(req.params.id);
			nuevoProducto.imagen = productoAnterior.imagen;
		}

		const producto = await Productos.findByIdAndUpdate(
			{ _id: req.params.id },
			nuevoProducto,
			{ new: true }
		);
		res.json({msg:"Producto actualizado satisfactoriamente"})
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.eliminarProducto = async (req,res,next) => {
	try {
		await Productos.findByIdAndDelete(req.params.id);
		res.json({msg:"Producto Eliminado Correctamente"})
	} catch (error) {
		console.log(error);
		next();
	}
}