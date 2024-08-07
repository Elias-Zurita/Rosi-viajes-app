const path = require ('path')
const multer = require('multer'); // Libreria para subir archivos al sitio

const storage = multer.diskStorage({   // Alojamiento de archivos
    destination: (req, file, cb) => {  
        cb (null, path.join(__dirname, "../../public/images/paquetes"))
    }, 
    filename: (req, file, cb) => { // Propiedad que guarda el nombre de la imagen // 
        const newFilename = "Banner" + Date.now() + path.extname (file.originalname); // El nombre del archivo va a ser "Banner + el horario en mili segundos (Datenow) + extension (extname)" 
        cb (null, newFilename); 
    } 
}); 

const uploadFile = multer ({storage}) // Ejecucion de multer (para subir archivos)

module.exports = uploadFile