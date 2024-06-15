import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan, { Morgan } from "morgan";
import SwaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Conectar a base de datos
async function connectDB() {
    try {
        console.log('Connecting to database...');
        await db.authenticate();
        console.log('Database authenticated.');
        await db.sync();
        console.log('Database synchronized.');
        console.log(colors.magenta("Conexión exitosa a la bd"));
    } catch (error) {
        console.log(colors.bgRed.white('Hubo un error al conectar la bd'));
        console.error(error);
    }
}


connectDB()

// Instancia de express
const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }

    }
}

server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())


server.use(morgan('dev'))
server.use('/api/products', router)

// Docs
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))

export default server