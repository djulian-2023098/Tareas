//Conexión a la DB

import mongoose from "mongoose";

export const connect = async()=>{
    try {
        //Cicli de vida de mongo
        mongoose.connection.on('error', ()=>{
            console.log('MongoDB |  Could not be connected to MongoDB')
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB |  try connecting')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB |  connected to database')
        })
        mongoose.connection.once('open', ()=>{
            console.log('MongoDB |  connected to database')
        })
        mongoose.connection.on('reconnected', ()=>{
            console.log('MongoDB |  reconnected to mongodb')
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB |  disconnected')
        })

        //Conectarse a la DB
        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50, //MAXIMO DE CONECCIONES
                serverSelectionTimeoutMS: 5000 //TIEMPO MAXIMO QUE ESPERA LA CONEXION
            }
        )
    } catch (err) {
        console.error('Database connection failed', err)
    }
}