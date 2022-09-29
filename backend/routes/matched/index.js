/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const likeHistory = require('../../likeHistory.json')
const addFamiliarityToUsersInfo = require('../../utils/function')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  const userId = req.query.userId
  console.log(`GET /matched?userId=${userId}`)
  const usersInfoWithFamiliarity = addFamiliarityToUsersInfo(userId)

  const userLikes = likeHistory[userId]
  const matchedUserId = []
  const matchedUserInfo = {}

  for (let i = 0; i < userLikes.length; i++) {
    const temp = likeHistory[userLikes[i]]
    for (let k in temp) {
      if (temp[k] === userId) {
        matchedUserId.push(userLikes[i])
      }
    }
  }

  for (let i = 0; i < matchedUserId.length; i++) {
    matchedUserInfo[matchedUserId[i]] = usersInfoWithFamiliarity[matchedUserId[i]]
  }

  res.status(200)
  res.send(matchedUserInfo)
})

module.exports = router
