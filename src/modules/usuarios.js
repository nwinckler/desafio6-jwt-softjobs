const {pool} = require("../config/db")

exports.obtenerUsuarios = async ()=>{
    try {
        const result = await pool.query("SELECT * FROM usuarios")
        return result.rows;
    } catch (error) {
        throw new Error("Error al obtener usuarios")
    }
}

exports.crearUsuario = async (email, password, rol, lenguage)=>{
    try {
        const verificarUsuarioQuery = "SELECT * FROM usuarios WHERE email = $1";
        const verificarUsuarioResult = await pool.query(verificarUsuarioQuery, [email]);
        if (verificarUsuarioResult.rows.length > 0) {
            throw new Error("El usuario ya existe");
        }else{
            const SQLquery = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)"
            const SQLvalues = [email, password, rol, lenguage]
            const result = await pool.query(SQLquery,SQLvalues)
        }
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error}`)
    }
}