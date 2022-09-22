/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const sampleRouter = require('./sample')
const matchedRouter = require('./matched')
const recommendedRouter = require('./recommended')
const userRouter = require('./user')

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.use('/sample', sampleRouter)
router.use('/matched', matchedRouter)
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.use('/recommended', recommendedRouter)
router.use('/user', userRouter)

module.exports = router
