'use stict'

var Equipo = require("../modelos/equipos.model");


function crearEquipo(req, res) {

    var equipoModel = new Equipo();
    var params = req.body;

    if (params.nombre && params.liga) {
        equipoModel.nombre = params.nombre;
        equipoModel.liga = params.liga;
        equipoModel.imagen = null;
        equipoModel.puntos = null;
        equipoModel.golesfavor = 0;
        equipoModel.golesContra = 0;
        equipoModel.diferenciaGoles = 0;
        Equipo.findOne({ nombre: params.nombre, liga: params.liga }, (err, equipoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
            if (!equipoEncontrado) {
                Equipo.find((err, equipos) => {
                    if (err) return res.status(500).send({ mensaje: 'error en la peticion' });

                    if (equipos.length >= 10) {
                        return res.status(500).send({ mensaje: 'maximo de equipos alcanzado' });
                    } else {
                        equipoModel.save((err, equipoguardado) => {
                            if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
                            if (!equipoguardado) return res.status(500).send({ mensaje: 'no se guardó el equipo' });
                            return res.status(200).send({ equipoguardado });

                        });
                    }
                });

            } else {
                return res.status(500).send({ mensaje: 'este equipo ya existe' });
            }
        });

    } else {

    }

}

function verEquipos(req, res) {

    var params = req.body;

    Equipo.find({ liga: params.liga }, (err, equiposEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
        if (!equiposEncontrados) return res.status(500).send({ mensaje: 'Aún no hay equipos' });

        return res.status(200).send({ equiposEncontrados });
    });
}

function editarEquipo(req, res) {
    var params = req.body;
    var EquipoId = req.params.id;
    delete params.liga
    delete params.puntos
    delete params.golesFavor
    delete params.golesContra
    delete params.diferenciaGoles
    Equipo.findByIdAndUpdate(EquipoId, params, { new: true }, (err, equipoActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
        if (!equipoActualizado) return res.status(500).send({ mensaje: 'no se pudo actualizar el equipo' });

        return res.status(200).send({ equipoActualizado });

    });
}

function eliminarEquipo(req, res) {

    var EquipoId = req.params.id;

    Equipo.findByIdAndDelete(EquipoId, (err, equipoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion' });
        if (!equipoEliminado) res.status(500).send({ mensaje: 'no se pudo eliminar el equipo' });

        return res.status(200).send({ mensaje: 'se ha eliminado el equipo' + equipoEliminado });
    });

}


module.exports = {
    verEquipos,
    crearEquipo,
    editarEquipo,
    eliminarEquipo
}