const express = require('express')

const router = express.Router()

// middleware
const { auth } = require('../middleware/auth')




//========================= ROUTER REGISTER DAN LOGIN  =========================
const { registrasi } = require('../controllers/register')
const { login } = require('../controllers/login')

// register
router.post('/register', registrasi)

// login
router.post('/login', login)







//========================= ROUTER USER =========================
const { getUsers, editUser, deleteUser } = require('../controllers/user')

// menampikan data
router.get('/getuser', getUsers)

// edit data
router.patch('/edituser/:id', auth, editUser)

// hapus data
router.delete('/deleteuser/:id', deleteUser)






//========================= ROUTER FOLLOW =========================
const { followers, following } = require('../controllers/follow')

// menampikan data
router.get('/followers/:id', followers)

// menampikan data
router.get('/following/:id', following)

















// penututp router
module.exports = router