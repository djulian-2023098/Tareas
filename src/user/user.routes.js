import { Router } from "express";
import { getAll, getUser, update } from "./user.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { updateUserValidator } from "../../middlewares/validators.js";

const api = Router()

api.get('/', validateJwt, getAll)
api.get('/:id', validateJwt, getUser)
api.put('/:id', [validateJwt, updateUserValidator], update)

export default api