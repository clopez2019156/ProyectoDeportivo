'use strict'

var express = require("express");
var md_autorizacion = require("../middlewares/authenticated.js");
var api = express.Router();
var UsuarioControlador = require("../controladores/usuarios.controlador");
var EquipoControlador = require("../controladores/equipo.controlador");
var ligaControlador = require("../controladores/liga.controlador");
var JornadaControlador = require("../controladores/jornadas.controlador");


//usuarioControlador
api.post("/login", UsuarioControlador.login);
api.get("/obtenerUsuarios", UsuarioControlador.obtenerUsuarios);
api.post("/obtenerUsuarioID/:id", md_autorizacion.ensureAuth, UsuarioControlador.obtenerUsuarioID);
api.put("/editarUsuario/:id", md_autorizacion.ensureAuth, UsuarioControlador.editarUsuario);
api.delete("/eliminarUsuario/:id", UsuarioControlador.eliminarUsuario);
api.post("/crearUsuario", UsuarioControlador.crearUsuario);
api.post("/crearUsuarioAdmin", md_autorizacion.ensureAuth, UsuarioControlador.crearUsuarioAdmin);


//ligaControlador
api.post("/crearLiga", md_autorizacion.ensureAuth, ligaControlador.crearLiga);
api.get("/verLigas", md_autorizacion.ensureAuth, ligaControlador.verLigas);
api.put("/editarLiga/:id", md_autorizacion.ensureAuth, ligaControlador.editarLiga);
api.delete("/eliminarLiga/:id", md_autorizacion.ensureAuth, ligaControlador.eliminarLiga);


//equipoControlador
api.post("/crearEquipo", md_autorizacion.ensureAuth, EquipoControlador.crearEquipo);
api.post("/verEquipos", EquipoControlador.verEquipos);
api.put("/editarEquipo/:id", md_autorizacion.ensureAuth, EquipoControlador.editarEquipo);
api.delete("/eliminarEquipo/:id", md_autorizacion.ensureAuth, EquipoControlador.eliminarEquipo);


//jornadasControlador
api.post("/crearJornada", md_autorizacion.ensureAuth, JornadaControlador.crearJornada);
api.post("/agregarResultado1", md_autorizacion.ensureAuth, JornadaControlador.agregarResultado1);
api.post("/agregarResultado2", md_autorizacion.ensureAuth, JornadaControlador.agregarResultado2);



module.exports = api;