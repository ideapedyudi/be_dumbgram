// memanggil model tabel database
const { user, follow } = require('../../models')

// follower
exports.followers = async (req, res) => {
    try {
        const { id } = req.params
        // menentukan parameter
        const id_user = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'bio', 'image', 'username', 'email', 'fullName']
            },
            include: {
                model: follow,
                as: 'follower',
                include: {
                    model: user,
                    as: 'follower',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'bio', 'password', 'email']
                    }
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'followers', 'followings']
                }
            }
        })

        if (!id_user) {
            return res.send({
                status: 'failed',
                message: 'id not found'
            })
        }

        // tampilkan
        res.send({
            status: 'success',
            data: {
                id_user
            }
        })

        // server error
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// following
exports.following = async (req, res) => {
    try {
        const { id } = req.params
        // menentukan parameter
        const id_user = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'bio', 'image', 'username', 'email', 'fullName']
            },
            include: {
                model: follow,
                as: 'following',
                include: {
                    model: user,
                    as: 'following',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'bio', 'password', 'email']
                    }
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'followers', 'followings']
                }
            }
        })

        if (!id_user) {
            return res.send({
                status: 'failed',
                message: 'id not found'
            })
        }

        // tampilkan
        res.send({
            status: 'success',
            data: {
                id_user
            }
        })

        // server error
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}