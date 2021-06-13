// memanggil model tabel message
const { message, user } = require('../../models')

// mencari parameter yang sesuai
const { Op } = require('sequelize')


// ================================= add chat  =======================================
exports.addChat = async (req, res) => {

    try {

        const { id } = req.params
        const { idUser } = req

        const { Message } = req.body

        // cek user penerima ada apa tidak
        const check = await user.findOne({
            where: {
                id
            }
        })

        if (!check) {
            return res.send({
                status: 'failed',
            })
        }

        // pensan disimpan di database
        const data = await message.create({
            recipient: id,
            sender: idUser,
            message: Message,
        })

        const messageSender = await message.findOne({
            where: {
                id: data.id
            },
            include: {
                model: user,
                as: 'Recipient',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'bio', 'email', 'password']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'recipient', 'sender']
            }
        })


        // menampikan ketika data berhasil di tambahkan
        res.send({
            status: 'success',
            data: {
                messageSender
            }
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


// ====================================== meampilkan chat  =======================================
exports.messageWithId = async (req, res) => {

    try {

        const { id } = req.params
        const { idUser } = req

        const check = await user.findOne({
            where: {
                id
            }
        })

        if (!check) {
            return res.send({
                status: 'failed',
            })
        }

        // memangil parameter untuk di tamppikan
        const messages = await message.findAll({
            where: {
                [Op.or]: [{
                    sender: id,
                    recipient: idUser
                },
                {
                    sender: idUser,
                    recipient: id
                }]
            },
            // iclude user
            include: {
                model: user,
                as: 'Sender',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'bio', 'email', 'password']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'sender', 'recipient']
            }
        })

        // berhasil
        res.send({
            status: 'success',
            data: {
                Message: messages
            }
        })

        // error server
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
