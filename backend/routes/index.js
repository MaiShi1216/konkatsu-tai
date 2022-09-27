/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const sampleRouter = require('./sample')
const signinRouter = require('./signin')
const matchedRouter = require('./matched')
const homeRouter = require('./home')
const recommendedRouter = require('./recommended')
const userRouter = require('./user')
const reactionsRouter = require('./reactions')

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.use('/sample', sampleRouter)
router.use('/signin', signinRouter)
router.use('/matched', matchedRouter)
router.use('/home', homeRouter)
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.use('/recommended', recommendedRouter)
router.use('/user', userRouter)
router.use('/reactions', reactionsRouter)

module.exports = router
