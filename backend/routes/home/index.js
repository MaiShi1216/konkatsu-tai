/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const users = require('../../userInfo.json')
const chatHistory = require('../../chatHistory.json')

const addFamiliarityToUsersInfo = require('../../function')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  const userId = req.query.userId
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`GET /home?userId=${userId}`)
  let body = undefined
  try {
    body = addFamiliarityToUsersInfo(userId)
    res.status(200)
  } catch (err) {
    console.error(err)
    body = { message: 500 }
    res.status(500)
  }
  res.send(body)
})

module.exports = router
