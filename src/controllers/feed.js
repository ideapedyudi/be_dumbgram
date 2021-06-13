// memanggil model tabel database
const { user, feed, follow, like, comment } = require('../../models')

// joi
const joi = require('joi')

// ============================================= tambah data feed =================================================
exports.addFeed = async (req, res) => {
    try {
        const { idUser } = req

        let { fileName, caption } = req.body

        const feedData = await feed.create({
            fileName,
            caption,
            userFeed: idUser
        })

        const feeds = await feed.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser', 'like', 'userFeed']
            },
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'bio', 'password', 'email']
                }
            },
        })

        res.send({
            status: 'success',
            data: {
                feeds
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


// ====================================== meampilkan semua feed follow ========================================
exports.followfeeds = async (req, res) => {
    try {

        const { id } = req.params

        // menampilkan semua data
        const userData = await user.findOne({
            // mengecualikan jika tidak ingin di tampilkan
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'bio', 'email', 'image', 'username', 'fullName', 'id']
            },
            where: {
                id
            },
            include: {
                model: follow,
                as: 'following',
                include: {
                    model: user,
                    as: 'following',
                    include: {
                        model: feed,
                        as: 'feed',
                        include: {
                            model: user,
                            as: 'user',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt', 'bio', 'password', 'email']
                            }
                        },
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'bio', 'password', 'email', 'fullName', 'image', 'username']
                    }
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'followers', 'followings']
                }
            }
        })

        // tampikan ketika berhasil
        res.send({
            status: 'success',
            data: {
                userData
            }
        })

        // tampilkan ketika server eror
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'

        })
    }
}



// ======================================= meampilkan semua feed all =========================================
exports.allFeed = async (req, res) => {
    try {

        // menampilkan semua data
        const allfeed = await feed.findAll({
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'bio', 'password', 'email']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        // tampikan ketika berhasil
        res.send({
            status: 'success',
            message: 'user successfully get',
            data: {
                allfeed
            }
        })

        // tampilkan ketika server eror
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}



// ================================================= like ===========================================
exports.likelike = async (req, res) => {
    try {
        // token
        const { idUser } = req

        // mendapatkan data body
        const { id } = req.body

        // cek inputan
        const schema = joi.object({
            id: joi.number().required()
        }).validate(req.body)


        // jika tidak memebuhi
        if (schema.error) {
            return res.send({
                status: 'validation failed',
                message: schema.error.details[0].message
            })
        }

        // mengecek apakah id ada di feed
        const checkId = await feed.findOne({
            where: {
                id
            }
        })

        // mencari emaail ada atau tidak
        if (!checkId) {
            return res.send({
                status: 'failed',
                message: "id feed not found"
            })
        }

        // cek jika udah like atau belum
        const check = await like.findOne({
            where: {
                idUser: idUser,
                idFeed: id
            }
        })

        if (check) {
            return res.send({
                status: 'failed',
                message: "like not found"
            })
        }

        // cek if feed
        const data = await feed.findOne({
            where: {
                id
            }
        })

        // tambahkan data ke like
        await like.create({
            idFeed: id,
            idUser: idUser
        })

        // menambhkan 1 dan update like feed
        const likes = data.like += 1
        await feed.update({ like: likes }, {
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            id
        })


        // tampil ketika server error
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}



// ================================================= comment ===========================================
// ---------------- meampilkan coment berdasarkan idfeed -----------------------
exports.commentidfeed = async (req, res) => {
    try {

        const { id } = req.params

        // menampilkan semua data
        const comments = await comment.findAll({
            // mengecualikan jika tidak ingin di tampilkan
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idfeed', 'iduser']
            },
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'bio', 'password', 'email']
                }
            },
            where: {
                idfeed: id
            }
        })

        // tampikan ketika berhasil
        res.send({
            status: 'success',
            data: {
                comments
            }
        })

        // tampilkan ketika server eror
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'

        })
    }
}


// -------------------------- add comment ---------------------------
exports.addComment = async (req, res) => {
    try {
        // token
        const { idUser } = req

        // mendapatkan data body
        const { id_feed, comments } = req.body

        // cek inputan
        const schema = joi.object({
            id_feed: joi.number().required(),
            comments: joi.string().required()
        }).validate(req.body)

        // jika tidak memebuhi
        if (schema.error) {
            return res.send({
                status: 'validation failed',
                message: schema.error.details[0].message
            })
        }


        // tambahkan data ke like
        const commentuser = await comment.create({
            idfeed: id_feed,
            iduser: idUser,
            comment: comments
        })


        // menampikan ketika data berhasil di tambahkan
        res.send({
            status: 'success',
            data: {
                id: commentuser.id
            }
        })

        // tampil ketika server error
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'

        })
    }
}