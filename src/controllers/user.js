// memanggil model tabel database
const { user, follow } = require('../../models')
// const follow = require('../../models/follow')

// =================================== meampilkan semua data di database ==================================
exports.getUsers = async (req, res) => {
    try {

        // menampilkan id dari token
        // const { idUser } = req

        // menampilkan semua data
        const users = await user.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        // tampikan ketika berhasil
        res.send({
            status: 'success',
            data: {
                users
            }
        })

        // ketika server erorr
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


// ================================================= edit data ==============================================
exports.editUser = async (req, res) => {
    try {

        // id mana yang ingin kita update
        const { id } = req.params

        // data body
        const { body } = req

        // menampilkan id dari token
        const { idUser } = req

        if (id == idUser) {
            // cek id
            const checkId = await user.findOne({
                where: {
                    id
                }
            })

            // jika id tidak ada
            if (!checkId) {
                return res.send({
                    status: 'failed',
                    message: `user with id: ${id} not found`
                })
            }

            // proses update
            await user.update(body,
                {
                    where: {
                        id
                    }
                })

            // menampilkan data saat sudah di update 
            const dataUpdate = await user.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                },
                where: { id }
            })

            // berhasil
            res.send({
                status: 'success',
                data: {
                    user: dataUpdate
                }
            })
        } else {
            res.send({
                status: 'failed',
                message: 'page not found',
            })
        }
        // error server
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


// =============================================== hapus data ===========================================
exports.deleteUser = async (req, res) => {
    try {
        // mengambil id
        const { id } = req.params

        // ketemu id hapus ada
        const deleteData = await user.destroy({
            where: {
                id
            }
        })

        if (!deleteData) {
            return res.send({
                status: 'failed',
                message: 'id not found'
            })
        }

        // berhasil
        res.send({
            status: 'success',

            data: {
                id
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