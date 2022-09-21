/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const sampleRouter = require('./sample')
const signupRouter = require('./signup')
const homeRouter = require('./home')

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.use('/sample', sampleRouter)
router.use('/signup', signupRouter)
router.use('/home', homeRouter)

module.exports = router
