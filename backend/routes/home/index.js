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
      .filter((userId) => (likeHistoryArr ? !likeHistoryArr.includes(userId) : true))
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
