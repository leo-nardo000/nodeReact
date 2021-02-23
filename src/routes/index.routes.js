const router = require("express").Router();

const clienteController = require("../controllers/clienteController");
const productosController = require("../controllers/productosController");
const pedidosController = require("../controllers/pedidosController");
const usuariosController = require("../controllers/usuariosController");

const authjwt = require("../middleware/auth");

router.get("/clientes", authjwt, clienteController.mostrarClientes);
router.get("/clientes/:id", authjwt, clienteController.mostrarCliente);
router.post("/clientes", authjwt, clienteController.nuevoCliente);
router.put("/clientes/:id", authjwt, clienteController.actualizarCliente);
router.delete("/clientes/:id", authjwt, clienteController.eliminarCliente);

//? productos
router.post(
	"/productos",
	authjwt,
	productosController.subirImagen,
	productosController.nuevoProducto
);
router.get("/productos", authjwt, productosController.mostrarProductos);
router.get("/productos/:id", authjwt, productosController.mostrarProducto);
router.get("/productos/:query", authjwt, productosController.buscarProducto);
router.put(
	"/productos/:id",
	authjwt,
	productosController.subirImagen,
	productosController.actualizarProducto
);
router.delete("/productos/:id", authjwt, productosController.eliminarProducto);

// ? pedidos
router.post("/pedidos", authjwt, pedidosController.nuevoPedido);
router.get("/pedidos", authjwt, pedidosController.mostrarPedidos);
router.get("/pedidos/:id", authjwt, pedidosController.mostrarPedido);
router.put("/pedidos/:id", authjwt, pedidosController.actualizarPedido);
router.delete("/pedidos/:id", authjwt, pedidosController.eliminarPedido);

// ? usuarios
router.post("/crear-cuenta", usuariosController.registrarUsuario);
router.post("/iniciar-sesion", usuariosController.autenticarUsuario);

module.exports = router;
