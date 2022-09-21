/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  console.log(req)
  res.status(200)
  setTimeout(() => res.send(usersInfo), 500)
})

module.exports = router
