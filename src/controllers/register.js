// memanggil model tabel database
const { user } = require('../../models')

// joi
const joi = require('joi')

// bcrypt
const bcrypt = require('bcrypt')

// jwt
const jwt = require('jsonwebtoken')

// registrasi
exports.registrasi = async (req, res) => {
    try {

        const { email, password } = req.body
        const data = req.body

        // skema pengecekan inputan
        const schema = joi.object({
            email: joi.string().email().min(6).required(),
            username: joi.string().min(6).required(),
            password: joi.string().min(6).required(),
            fullName: joi.string().min(3).required()
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


        // bcrypt email enkripsi password
        const hashStrenght = 10
        const hashhedPassword = await bcrypt.hash(password, hashStrenght)

        // masukkan ke  database
        const dataUser = await user.create({
            ...data,
            password: hashhedPassword
        })

        // membuat token
        const secretKey = process.env.SECRET_KEY

        // tokennya
        const token = jwt.sign({
            id: dataUser.id
        }, secretKey)

        // jika berhasil pengecekan
        res.send({
            status: 'success',
            data: {
                user: {
                    fullName: dataUser.fullName,
                    username: dataUser.username,
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