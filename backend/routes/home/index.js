/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const likeHistory = require('../../likeHistory.json')
const addFamiliarityToUsersInfo = require('../../utils/function')

// /* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  const userId = req.query.userId
  console.log(`GET /home?userId=${userId}`)
  let body = {}
  try {
    const likeHistoryArr = likeHistory[userId]
    const usersInfo = addFamiliarityToUsersInfo(userId)
    Object.keys(usersInfo)
      .filter((userId) => !likeHistoryArr.includes(userId))
      .forEach((userId) => {
        body[userId] = usersInfo[userId]
      })
    res.status(200)
  } catch (err) {
    console.error(err)
    body = { message: 500 }
    res.status(500)
  }
  res.send(body)
})

module.exports = router
