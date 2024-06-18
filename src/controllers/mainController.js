const path = require("path");

const controller = {
    index: (req, res) =>{
        res.render('index')    // renderiza el index  //
    },
    preguntas: (req, res) =>{
        res.render('web/preguntas')   
    },
    contacto: (req, res) =>{
        res.render('web/contacto')   
    }
 }

module.exports = controller;