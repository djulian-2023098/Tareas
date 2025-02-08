//Gestionar funciones de usuario
import User from './user.model.js'


//Obtener todos
export const getAll = async(req,res)=>{
    try{
        //Configuraciones de paginación
        const { limit = 20, skip = 0} = req.query
        //Consultar
        const users = await User.find()
            .skip(skip)
            .limit(limit)
        if(users.length === 0){
            return res.status(404).send(
                {
                    succes: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                succes: true,
                message: 'User found',
                users
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error',e})
    }
}

export const getUser = async(req, res)=>{
    try {
        //obtener el id del Producto a mostrar
        let {id} = req.params
        let user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                succes:false,
                message: 'User not found',
            }
        )
        return res.send(
            {
                succes: true,
                message: 'User found: ',
                user
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({message: 'General error', err})
    }
}

//Actualizar datos generales
export const update = async(req, res)=>{
    try {
        const { id } = req.params

        const data = req.body

        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!update) return res.status(404).send(
            {
                succes: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                succes: true,
                message: 'User update',
                user: update
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error',
                err
            }
        )
    }
}