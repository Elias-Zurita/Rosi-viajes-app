const path = require("path"); // Libreria path para usar put y delete
const fs = require("fs"); // Libreria fileSync para leer archivos JSON

function findAll() {
  let paquetesJson = fs.readFileSync(
    path.join(__dirname, "../database/paquetes.json")
  ); // Lee el archivo paquetes.json donde estan los paquetes
  let data = JSON.parse(paquetesJson); // Declara data para "parsear" (consumir) la info del Json
  return data;
}
function writeJson(array) {
  // Sobreescribe info al JSON data
  let arrayJSON = JSON.stringify(array, null, " "); // Convierte el array en JSON  //  se agrega null y las comillas para que quede un espacio
  return fs.writeFileSync(
    path.join(__dirname, "../database/paquetes.json"),
    arrayJSON
  );
}

module.exports = {
  listado: (req, res) => {
    let paquetes = findAll();
    const itemsPerPage = 15; // Declaro la cantidad de paquetes que quiero visualizar por pagina
    const page = parseInt(req.query.page) || 1; // Por default la pagina es la 1

    const startIndex = (page - 1) * itemsPerPage; // Indice del primer paquete por pagina
    const endIndex = startIndex + itemsPerPage; // Indice el ultimo paquete por pagina

    const paginatedPaquetes = paquetes.slice(startIndex, endIndex); // El metodo slice obtiene solo los paquetes de la pagina actual

    res.render("paquetes/listado", {
      paquetes: paginatedPaquetes,
      currentPage: page,
      totalPages: Math.ceil(paquetes.length / itemsPerPage),
      terminoDeBusqueda: "", // Define terminoDeBusqueda como una cadena vacía
    });
  },
  detalle: (req, res) => {
    let paquetes = findAll();
    let paqueteEncontrado = paquetes.find(function (paquete) {
      return paquete.id == req.params.id; //renderiza el paquete que se pida por id //
    });
    res.render("paquetes/detalle", { paquete: paqueteEncontrado }); // renderiza el detalle del paquete pedido por id //
  },
  buscar: (req, res) => {
    let terminoDeBusqueda = (req.query.buscar || "").toLowerCase(); // toma el texto ingresado al campo de busqueda y aplica toLowerCase asi la busqueda cubre mayusculas y minusculas
    let paquetes = findAll();
    let paquetesFiltrados = paquetes.filter(
      (paquete) =>
        paquete.Nombre.toLowerCase().includes(terminoDeBusqueda) || // filtro los paquetes que contengan en su nombre un match con el termino de busqueda ingresado
        paquete.Categoria.toLowerCase().includes(terminoDeBusqueda) // Busqueda por Categoria tambien
    );
    const itemsPerPage = 15;
    const page = parseInt(req.query.page) || 1; // Default page is 1 if not specified

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedPaquetes = paquetesFiltrados.slice(startIndex, endIndex);

    res.render("paquetes/listado", {
      paquetes: paginatedPaquetes,
      currentPage: page,
      totalPages: Math.ceil(paquetesFiltrados.length / itemsPerPage),
      terminoDeBusqueda,
    });
  },
  categoria: (req, res) => {
    let paquetes = findAll();
    let categoriaSeleccionada = paquetes.filter(function (paquetes) {
      // filtra las categorias de los paquetes
      return paquetes.Categoria == req.params.Categoria; // devuelve la categoria del paquete pedida por params(seleccionada en el navegador)
    });
    const itemsPerPage = 15;
    const page = parseInt(req.query.page) || 1; // Default page is 1 if not specified

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedPaquetes = categoriaSeleccionada.slice(startIndex, endIndex);

    res.render("paquetes/listado", {
      paquetes: paginatedPaquetes,
      currentPage: page,
      totalPages: Math.ceil(categoriaSeleccionada.length / itemsPerPage),
      terminoDeBusqueda: "", // Define terminoDeBusqueda como una cadena vacía
    });
  },
};
