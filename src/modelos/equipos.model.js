'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EquipoSchema = Schema({
    nombre: String,
    imagen: String,
    liga: { type: Schema.Types.ObjectId, ref: 'ligas' },
    puntos: Number,
    golesFavor: Number,
    golesContra: Number,
    diferenciaGoles: Number
});

module.exports = mongoose.model('equipos', EquipoSchema);