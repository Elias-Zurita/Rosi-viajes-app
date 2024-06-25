const express = require('express');
const router = express.Router();

// Controller
const paquetesController = require("../controllers/paquetesController");

// Formulario de listado de paquetes //
router.get("/", paquetesController.listado);
router.get("/detalle/:id", paquetesController.detalle);
router.get("/buscar", paquetesController.buscar);
router.get("/:Categoria", paquetesController.categoria);

module.exports = router;