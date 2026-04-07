import multer from 'multer'

export default {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 4 * 1024 * 1024
    },
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        const allowwedMimes = ["image/jpeg", "image/jpg", "image/png"]

        if(allowwedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Formato de qrquivo invalido, use apenas JPG, JPEG, PNG."))
        }
    }
}