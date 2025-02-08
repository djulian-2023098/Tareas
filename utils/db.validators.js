import User from '../src/user/user.model.js'
                                    //parametro | token | id
export const existUsername = async (username, user)=>{
    const alredyUsername = await User.findOne({username})
    if (alredyUsername && alredyUsername._id != user.uid) {
        console.error(`Username ${username} is alredy taken`)
        throw new Error (`Username ${username} is alredy taken`)
    }
}

export const existEmail = async (email, user)=>{
    const alredyEmail = await User.findOne({email})
    if (alredyEmail && alredyEmail._id != user.uid) {
        console.error(`Email ${email} is alredy taken`)
        throw new Error(`Email ${email} is alredy taken`)
    }
}

export const notRequiredFile = (field)=>{
    if(field){
        throw new Error(`field is not required`)
    }
}