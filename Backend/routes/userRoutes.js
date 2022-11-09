const express = require('express')
const { userinfo, clear, allUsers } = require('../controller/userController')
const router = express.Router()


router.get('/userinfo',userinfo)
router.delete('/clear',clear)
router.get('/getalluser',allUsers)


module.exports = router