// memanggil model tabel database
const { user } = require('../../models')

// joi
const joi = require('joi')

// bcrypt
const bcrypt = require('bcrypt')

// jwt
const jwt = require('jsonwebtoken')

// login
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body
        const data = req.body

        // skema pengecekan inputan
        const schema = joi.object({
            email: joi.string().email().min(6).required(),
            password: joi.string().min(8).required()
        })

        // jika validasi tidak memenuhi
        const { error } = schema.validate(data)

        // jika tidak memebuhi
        if (error) {
            return res.send({
                status: 'validation failed',
                message: error.details[0].message
            })
        }

        // mengecek apakah email sudah terdaftar atau belum
        const checkEmail = await user.findOne({
            where: {
                email
            }
        })

        // mencari emaail ada atau tidak
        if (!checkEmail) {
            return res.send({
                status: 'failed',
                message: "Email and Password don't match"
            })
        }

        // cek password
        const isValidPassword = await bcrypt.compare(password, checkEmail.password)

        // jika password tidak falid
        if (!isValidPassword) {
            return res.send({
                status: 'failed',
                message: "Email and Password don't match"
            })
        }

        // membuat token
        const secretKey = process.env.SECRET_KEY

        // tokennya
        const token = jwt.sign({
            id: checkEmail.id
        }, secretKey)

        // jika berhasil pengecekan
        res.send({
            status: 'success',
            data: {
                user: {
                    fullName: checkEmail.fullName,
                    username: checkEmail.username,
                    email: checkEmail.email,
                    token
                }
            }
        })

        // letika server error
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}