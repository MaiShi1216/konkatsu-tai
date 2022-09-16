/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const sampleRouter = require('./sample')
const signinRouter = require('./signin')

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.use('/sample', sampleRouter)
router.use('/signin', signinRouter)
module.exports = router
