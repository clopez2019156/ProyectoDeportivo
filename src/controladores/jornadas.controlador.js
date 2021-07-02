'use strict'

var Jornada = require("../modelos/jornadas.model");
var Equipo = require("../modelos/equipos.model");

function crearJornada(req, res) {

    var jornadaModel = new Jornada();
    var params = req.body;

    if (params.nombre && params.liga) {
        jornadaModel.nombre = params.nombre;
        jornadaModel.liga = params.liga;
        Jornada.findOne({ nombre: params.nombre }, (err, jornadaEncontrada) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
            if (!jornadaEncontrada) {
                Equipo.find((err, equipoEncontrados) => {
                    if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
                    if (!equipoEncontrados) return res.status(500).send({ mensaje: 'no hay equipos todavía para crear jornadas' });

                    jornadaModel.save((err, jornadaGuardada) => {
                        if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
                        if (!jornadaGuardada) return res.status(500).send({ mensaje: 'no se guardó la jornada' });
                        return res.status(200).send({ jornadaGuardada });
                    });
                });
            } else {
                return res.status(500).send({ mensaje: 'esta jornada ya existe' });
            }
        });

    } else {
        return res.status(500).send({ mensaje: 'no puede dejar parametros vacios' });
    }

}



module.exports = {
    crearJornada
}