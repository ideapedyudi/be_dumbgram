const express = require('express')

const router = express.Router()

// middleware
const { auth } = require('../middleware/auth')




//================================== ROUTER REGISTER DAN LOGIN  ====================================
const { registrasi } = require('../controllers/register')
const { login } = require('../controllers/login')

// router register
router.post('/register', registrasi)

// router login
router.post('/login', login)



//============================================ ROUTER USER ==========================================
const { getUsers, editUser, deleteUser } = require('../controllers/user')

// router menampikan data
router.get('/getuser', getUsers)

// router edit data
router.patch('/edituser/:id', auth, editUser)

// router hapus data
router.delete('/deleteuser/:id', deleteUser)



//============================================== ROUTER FOLLOW =========================================
const { followers, following } = require('../controllers/follow')

// router menampikan followers
router.get('/followers/:id', followers)

// router menampikan following
router.get('/following/:id', following)



//=========================================== ROUTER FEED ===============================================
const { addFeed, followfeeds, allFeed, likelike, commentidfeed, addComment } = require('../controllers/feed')

// router menambahkan feed
router.post('/feed', auth, addFeed)

// router feed follow
router.get('/followfeeds/:id', auth, followfeeds)

// router all feed
router.get('/allFeed', allFeed)

// router like
router.post('/like', auth, likelike)

// router comment parameneter id feed
router.get('/comment/:id', commentidfeed)

// router add comment
router.post('/comment', auth, addComment)



//=========================================== ROUTER MESSAGE ===============================================

const { addChat, messageWithId } = require('../controllers/message')
// router message
router.get('/message-user/:id', auth, messageWithId)

// router add message
router.post('/message/:id', auth, addChat)









// penutup router
module.exports = router