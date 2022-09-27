/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  console.log('GET /home')
  res.status(200)
  res.send(usersInfo)
})

module.exports = router
