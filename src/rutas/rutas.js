'use strict'

var express = require("express");
var md_autorizacion = require("../middlewares/authenticated.js");
var api = express.Router();
var UsuarioControlador = require("../controladores/usuarios.controlador");
var EquipoControlador = require("../controladores/equipo.controlador");


//usuarioControlador
api.post("/login", UsuarioControlador.login);
api.get("/obtenerUsuarios", UsuarioControlador.obtenerUsuarios);
api.post("/obtenerUsuarioID/:id", md_autorizacion.ensureAuth, UsuarioControlador.obtenerUsuarioID);
api.put("/editarUsuario/:id", md_autorizacion.ensureAuth, UsuarioControlador.editarUsuario);
api.delete("/eliminarUsuario/:id", md_autorizacion.ensureAuth, UsuarioControlador.eliminarUsuario);
api.post("crearUsuario", UsuarioControlador.crearUsuario);

//equipoControlador
api.post("/crearEquipo", EquipoControlador.crearEquipo);
api.post("/verEquipos", EquipoControlador.verEquipos);
api.put("/editarEquipo/:id", EquipoControlador.editarEquipo);
api.delete("/eliminarEquipo/:id", EquipoControlador.eliminarEquipo);

module.exports = api;