import Animal from './animal.model.js'



//obtener todos
export const getAll = async (req, res)=>{
    try {

        const {limit = 20, skip = 0} = req.query

        const animal = await Animal.find()
            .skip(skip)
            .limit(limit)
        if(animal.length === 0){
            return res.status(404).send(
                {
                    succes: false,
                    message: 'Animal not found'
                }
            )
        }
        return res.send(
            {
                succes: true,
                message: 'Animal found',
                animal
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'General error', err})
    }
}

//AGREGAR
export const addAnimal = async(req, res)=>{
    try {
        //Capturar los datos
        let data = req.body
        //Crear el objeto del modelo agregarle los datos capturados
        let animal = new Animal(data)
        //guardar
        await animal.save()
        //Responder a usuario
        return res.send({message:`Register successfully, Animal can be added`})
    } catch (err) {
        return res.status(500).send({message: 'General error with animal registration', err})
    }
}

//ACTUALIZAR
export const updateAnimal = async(req, res)=>{
    try {
        const { id } = req.params
        const data = req.body
        const update = await Animal.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!update) return res.status(404).send(
            {
                succes: false,
                message: 'Animal not found'
            }
        )
        return res.send(
            {
                succes:true,
                message: 'Animal update',
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

//ELIMINAR
export const deleteAnimal = async(req,res)=> {
    try {
        let id = req.params.id
        let animal = await Animal.findByIdAndDelete(id)
        if(!animal) return res.status(404).send({message: 'Animal not founded'})
            return res.send({message: 'Delete succesfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error'})
    }
}

//OBTENER UNO
export const getOne = async(req, res)=>{
    try {
        //Obtener el id del animal a mostrar
        let { id } = req.params
        let animal = await Animal.findById(id)
        if(!animal) return res.status(404).send(
            {
                success: false,
                message: 'Animal not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Animal found',
                animal
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'Genreal error',
                err
            }
        )
    }
}