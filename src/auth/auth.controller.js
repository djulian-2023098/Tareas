//Gestionar un perfil existente de usuario
import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jvt.js'

export const test = (req, res)=>{
    console.log('Test is running')
    res.send({message: 'Test is running'})
}

//Register
export const register = async(req, res)=>{
    try {
        //Capturar los datos
        let data = req.body
        //Crear el objeto del modelo agregarle los datos capturados
        let user = new User(data)
        //Encriptar la password (2)
        user.password = await encrypt(user.password)
        //Asignar un roll por defecto
        user.role = 'CLIENT'
        //Asignar picture
        user.profilePicture = req.file.filename ?? null //Nullish si es verdadero lo de la izquierda pone ese valor, sino pone el de la derecha
        //guardar
        await user.save()
        //Responder a usuario
        return res.send({message:`Register successfully, can be logged with usermane: ${user.username}`})
    } catch (err) {
        return res.status(500).send({message: 'General error with user registration', err})
    }
}

//lOGIN
export const login = async(req,res)=>{
    try {
        //capturar los datos (body)
        let {userLoggin ,password} = req.body
        //Validar que el usuario exista
        let user = await User.findOne(
            {
                $or: [//Subfunción OR|espera un [] de busquedas
                    {email: userLoggin} ,
                    {username: userLoggin}

                ]
            }
        ) //{username} = {username: username}
        //Verificar que la contraseña coinsida
        if(user && await checkPassword(user.password, password)){
            //Generar el token
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        } 
        //Responder al usuario
        return res.status(400).send({message:'Invalid credentials'})
    } catch (err) {
        return res.status(500).send({message:'General error with login function', err})
    }
}