const path = require('path'); // Libreria path para usar put y delete
const fs = require('fs');  // Libreria fileSync para leer archivos JSON

// PAQUETES JSON
function findAll() {
    let paquetesJson =  fs.readFileSync(path.join(__dirname, "../database/paquetes.json"))   // Lee el archivo paquetes.json donde estan los productos
    let data = JSON.parse(paquetesJson); // Declara data para "parsear" (consumir) la info del Json
    return data 
}
function writeJson(array){   // Sobreescribe info al JSON data
    let arrayJSON = JSON.stringify(array, null," ")  // Convierte el array en JSON  //  se agrega null y las comillas para que quede un espacio
    return fs.writeFileSync(path.join(__dirname, "../database/paquetes.json"), arrayJSON);  
}

module.exports = {
    listado: (req, res) => {
        let paquetes = findAll();
        res.render("administrador/administrar", { paquetes }); 
    },
    crear: (req, res) => {
        let paquetes = findAll();
        res.render("administrador/crear", { paquetes });
    },
    crearProceso: (req, res) => {
      let paquetes = findAll();
      let nuevoPaquete = {
        id: paquetes.length + 1, // Cuenta la cantidad de elementos que se tienen y le suma uno
        Nombre: req.body.Nombre,
        Dias: req.body.Dias,
        Fecha: req.body.Fecha,
        Traslados: req.body.Traslados,
        Categoria: req.body.Categoria,
        Hospedaje: req.body.Hospedaje,
        Regimen: req.body.Regimen,
        Precio: req.body.Precio,
        Precio_Reserva: req.body.Precio_Reserva,
        Detalles: req.body.Detalles,
        Banner: req.file.filename,
      };
      let paquetesActualizados = [...paquetes, nuevoPaquete]; // Ingresa los datos de nuevoPaquete en un producto

      writeJson(paquetesActualizados);
      res.redirect("/administrar/paquetesList");
    },
    editar: (req, res) => {
        let paquetes = findAll();
        let paqueteAEditar = paquetes.find(paquete => // Encuentro un paquete
            paquete.id == req.params.id); // Renderiza el paquete que se pide por id

        res.render("administrador/editar", { paquete: paqueteAEditar });
    },
    editarProceso: (req, res) => {
      let paquetes = findAll();
      let paquetesActualizados = paquetes.map((paquete) => {
        // busca en el array el elemento al que va a editar e itera sobre cada dato
        if (paquete.id == req.params.id) {
          //si el paquete es igual al parametro que nos llega por ruta actualiza los datos //
          paquete.Nombre = req.body.Nombre;
          paquete.Dias = req.body.Dias;
          paquete.Fecha = req.body.Fecha;
          paquete.Traslados = req.body.Traslados;
          paquete.Categoria = req.body.Categoria;
          paquete.Hospedaje = req.body.Hospedaje;
          paquete.Regimen = req.body.Regimen;
          paquete.Precio = req.body.Precio;
          paquete.Precio_Reserva = req.body.Precio_Reserva;
          paquete.Detalles = req.body.Detalles;
          paquete.Banner = req.file ? req.file.filename : paquete.Banner;
        }
        return paquete;
      });
      writeJson(paquetesActualizados); // modifica el paquete //

      res.redirect("/paquetes/detalle/" + req.params.id); // redirecciona a la pagina de detalle del paquete editado //
    },
    eliminar: (req, res) => {
      let paquetes = findAll();
      let dataNueva = paquetes.filter(function (paquetes) {
        // Filtro los paquetes para excluir el que se debe eliminar
        return paquetes.id != req.params.id; // Todos los paquetes distintos del seleccionado que vino por id
      });

      writeJson(dataNueva); // Escribo el nuevo conjunto de paquetes al archivo JSON sin el paquete eliminado

      res.redirect("/administrar/paquetesList");
    }
}
