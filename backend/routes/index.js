/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const sampleRouter = require('./sample')
const chatRouter = require('./chat')
const signupRouter = require('./signup')

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.use('/sample', sampleRouter)
router.use('/signup', signupRouter)
router.use('/chat', chatRouter)

module.exports = router
