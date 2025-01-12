const express = require("express");
const app = express();
const port = 3000;
const routes = require("./src/routes/index")
const cors = require("cors")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extendd: true }));
app.use("/",routes())

app.listen(port, () => console.log(`Servidor encendido en puerto ${port}!`));
