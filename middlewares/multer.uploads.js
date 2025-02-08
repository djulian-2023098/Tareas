//Gestionar la imagenes
import multer, {diskStorage} from "multer";
import { dirname, extname, join } from 'path'
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const MINETYPES = ["image/jpeg","image/png", 'image/jpg']
const MAX_SIZE = 10000000//Bytes

const multerConfig = (destinationPath) =>{
    return multer(
        {
            storage: diskStorage(
                {
                    destination: (req, file, cb)=>{ //Donde guardar
                        const fullPath = join(CURRENT_DIR, destinationPath)
                        req.filePath = fullPath
                        cb(null, fullPath)
                    },
                    filename: (req, file, cb)=>{// Con que nombre
                        const fileExtension = extname(file.originalname)
                        const fileName = file.originalname.split(fileExtension)[0]
                        cb(null, `${fileName}-${Date.now()}${fileExtension}`)//Ejemplo de como quedaría futbol - fecha en uniques - .png
                    }
                }
            ),
            fileFilter: (req, file, cb)=>{//Validaciones de extensión

                if(MINETYPES.includes(file.mimetype)) cb(null, true)
                else cb(new Error(`Only ${MINETYPES.join(" ")} are allowed`))
            },
            limits:{// Tamaño máximo
                fileSize: MAX_SIZE
            }
        }
    )
}

export const uploadProfilePicture = multerConfig('../uploads/img/users')