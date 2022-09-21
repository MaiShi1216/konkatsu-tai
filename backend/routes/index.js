/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const sampleRouter = require('./sample')
const matchedRouter = require('./matched')
const homeRouter = require('./home')
const userRouter = require('./user')

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.use('/sample', sampleRouter)
router.use('/matched', matchedRouter)
router.use('/home', homeRouter)
router.use('/user', userRouter)

module.exports = router
