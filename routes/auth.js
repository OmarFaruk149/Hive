const express = require('express')
const router = express.Router()
const { auth } = require('../controller/auth').default

router.get('/', auth)

module.exports = router