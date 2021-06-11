// jwt
const jwt = require('jsonwebtoken')


exports.auth = (req, res, next) => {
    try {

        // Authorization
        let header = req.header("Authorization")

        // jika tidak mengirim token
        if (!header) {
            return res.send({
                status: 'failed',
                message: "access failed"
            })
        }

        // type token Bearer
        let token = header.replace("Bearer ", "")

        const secretKey = process.env.SECRET_KEY

        const verified = jwt.verify(token, secretKey)

        // menampung id
        req.idUser = verified.id

        next()


    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}