/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const sampleRouter = require('./sample')
const chatRouter = require('./chat')

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.use('/sample', sampleRouter)
router.use('/chat',chatRouter)

module.exports = router
