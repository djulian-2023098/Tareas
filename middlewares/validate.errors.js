//Validar los errores del middelware
import { validationResult } from "express-validator";

export const validateErrors = (req, res , next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(errors)
    }
    next()
}

export const validateErrorsWithoutFiles = (req, res , next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).send(
            {
                succes: false,
                message: 'Error with validations',
                errors: errors.errors
            }
        )
    }
    next()
}