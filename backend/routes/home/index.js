/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json')
const likeHistory = require('../../likeHistory.json')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  const loginId = req.query.loginId
  console.log(`GET /home?loginId=${loginId}`)

  let body = {}
  const likeHistoryArr = likeHistory[loginId]
  Object.keys(usersInfo)
    .filter((userId) => !likeHistoryArr.includes(userId))
    .forEach((userId) => {
      body[userId] = usersInfo[userId]
    })
  res.status(200)
  res.send(body)
})

module.exports = router
