const express = require('express')

const router = express.Router()

// middleware
// const { auth } = require('../middleware/auth')

//========================= registrasi dan login =========================
const { registrasi } = require('../controllers/register')
const { login } = require('../controllers/login')

// register
router.post('/register', registrasi)

// login
router.post('/login', login)

// penututp router
module.exports = router