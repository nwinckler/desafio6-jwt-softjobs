const express = require("express")
const router = express.Router()
const usuariosController = require("../controllers/usuariosController")
const reportarConsulta = require("../reports/reports")

module.exports =()=>{
    router.get("/",(req,res)=>{
        res.send("Bienvenido al servidor")
    })

    router.get("/usuarios",
        reportarConsulta.reportarConsulta,
        usuariosController.obtenerUsuarios)
    router.post("/usuarios",
        reportarConsulta.reportarConsulta,
        usuariosController.crearUsuario)
    router.post("/login",
        reportarConsulta.reportarConsulta,
        usuariosController.autenticarUsuarios)
    return router
} 