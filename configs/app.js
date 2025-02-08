//LEVANTAR EL SERVIDOR HTTP

//ESTRUCTURA MODULAR + EFECTIVA + LEGIBLE | trabaja en funciones

'use strict'

//ECModules | ESModules
import express from 'express'//servidor http
import morgan from 'morgan'//logs
import helmet from 'helmet'//seguridad pra http
import cors from 'cors'//acceso al API
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

//Configuraciones de express
const configs = (app)=>{
    app.use(express.json())//Aceptar y enviar datos en JSON
    app.use(express.urlencoded({extends: false}))//No encriptar la URL
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)//validar las solicitudes en x tiempo
}

const routes = (app)=>{
    app.use(authRoutes)
    //Veserión del API y entidad
    app.use('/v1/user', userRoutes)
    app.use('/animal', animalRoutes)
} 

//Ejecutamos el servidor
export const initServer = ()=>{
    const app = express()//app es el servidor
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}