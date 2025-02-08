//Validar campos en las rutas
import { body } from "express-validator";
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js";
import { existEmail, existUsername, notRequiredFile } from "../utils/db.validators.js";

//Arreglo de validación
export const resgisterValidation = [
    body('name','Name can not be empty')
    .notEmpty(),
    body('surname','Surname can not be empty')
    .notEmpty(),
    body('email','Email can not be empty')
    .notEmpty()
    .isEmail()
    .custom(existEmail),
    body('username', 'Username can not be empty')
    .notEmpty()
    .toLowerCase()
    .custom(existUsername),
    body('password', 'password can not be empty')
    .notEmpty()
    .isStrongPassword().withMessage('password must be strong')
    .isLength({min: 8}),
    body('phone','Phone can not be empty')
    .notEmpty()
    .isMobilePhone(),
    validateErrors//si lleva parentesis sería una ejecución de esa función sino lleva parentesis es porque es una REFERENCIA (se ejecutan cuando se usan)
]

export const updateUserValidator = [
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username, { req })=> existUsername(username, req.user)),
        body ('email')
        .optional()//parámetro pcional, puede llegar como no puede llegar
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
        body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredFile),
        body('profilePicture')
        .optional()
        .notEmpty()
        .custom(notRequiredFile),
        body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredFile),
        validateErrorsWithoutFiles//Después lo vamos a modificar
]