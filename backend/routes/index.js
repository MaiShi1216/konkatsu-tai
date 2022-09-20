/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const sampleRouter = require('./sample')
<<<<<<< HEAD
const matchedRouter = require('./matched')
||||||| 1d440a9
=======
const signupRouter = require('./signup')
>>>>>>> main

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.use('/sample', sampleRouter)
<<<<<<< HEAD
router.use('/matched', matchedRouter)
||||||| 1d440a9
=======
router.use('/signup', signupRouter)
>>>>>>> main

module.exports = router
