//Rutas de autentificación
import { Router } from "express";
import { login, register, test } from "./auth.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { resgisterValidation } from "../../middlewares/validators.js";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";


const api = Router()

//Rutas públicas
                    //middlewares
api.post('/register', 
    [
        uploadProfilePicture.single("profilePicture"),
        //Validador de errores!!
        resgisterValidation,
        //Ejecutar la validación de errores(delete.file.on.errors.js)
        deleteFileOnError
    ],
    register
)
api.post('/login',login)
//Rutas privadas
api.get('/test', validateJwt,test)

//Exporto las rutas
export default api