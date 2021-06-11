const express = require('express')

const router = express.Router()

// middleware
// const { auth } = require('../middleware/auth')

//========================= auth registrasi dan login =========================
const { registrasi } = require('../controllers/register')

// register
router.post('/register', registrasi)

// penututp router
module.exports = router