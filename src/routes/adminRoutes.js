const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const controllerAdmin = require("../controllers/adminController");

// Middlewares //
const uploadFile = require("../middlewares/multerMiddlewarePaquetes");
const adminMiddleware = require('../middlewares/adminMiddleware'); // Brinda acceso a la ruta solo si es ADMIN

router.get("/paquetesList", adminMiddleware, controllerAdmin.listado); // Renderizado de listado
router.get('/crear', adminMiddleware, controllerAdmin.crear) // Renderizado de Vista Crear
router.post('/crear', uploadFile.single("Banner"), adminMiddleware, controllerAdmin.crearProceso) // Proceso de creacion
router.get('/editar/:id', adminMiddleware, controllerAdmin.editar) // Renderizado de Vista Editar
router.put('/editar/:id', uploadFile.single("Banner"), adminMiddleware, controllerAdmin.editarProceso) // Proceso de edicion
router.delete('/eliminar/:id', adminMiddleware, controllerAdmin.eliminar) // Proceso de eliminacion

module.exports = router;