import { Router } from "express";
import { getAll, addAnimal, updateAnimal, deleteAnimal, getOne } from "./animal.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.get('/', validateJwt, getAll)
api.post('/add', validateJwt, addAnimal)
api.put('/:id', validateJwt,updateAnimal)
api.delete('/:id', validateJwt, deleteAnimal)
api.get('/:id', validateJwt, getOne)

export default api