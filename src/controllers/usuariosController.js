const {obtenerUsuarios, crearUsuario} = require("../modules/usuarios")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios()
        res.status(200).send(usuarios)
    } catch (error) {
        res.status(500).send("Error al obtener usuarios")
    }
}

exports.crearUsuario = async (req, res) => {
    try {
        let {email, password, rol, lenguage} = req.body
        password = await bcrypt.hash(password, 12)
        await crearUsuario(email, password, rol, lenguage)
        res.status(200).send("Usuario creado")
    } catch (error) {
        res.status(500).send(`Error al crear usuario ${error}`)
    }
}

exports.autenticarUsuarios = async (req, res) => {
    try {
        const {email, password} = req.body
        console.log(req.body);
        const usuarios = await obtenerUsuarios()
        const usuario = usuarios.find(usuario => usuario.email === email)
        if (!usuario) {
            res.status(401).json({message:"Usuario no encontrado"})
        } else{
            if (!bcrypt.compareSync(password, usuario.password)) {
                res.status(401).json({message:"Contraseña incorrecta"})
            }else{
                const token = jwt.sign({id: usuario.id, email: usuario.email, rol: usuario.rol}, "JWT_KEY")
                res.status(200).json(token)
            }
        }
    } catch (error) {
        res.status(500).send("Error al autenticar usuario")
    }
}
