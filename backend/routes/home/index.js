// /* eslint-disable @typescript-eslint/no-unsafe-call */
// <<<<<<< HEAD
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// =======
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const router = require('express').Router()
const likeHistory = require('../../likeHistory.json')

/* Import DB */
// <<<<<<< HEAD
// const users = require('../../userInfo.json')
// const chatHistory = require('../../chatHistory.json')

const addFamiliarityToUsersInfo = require('../../utils/function')

// /* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  const userId = req.query.userId
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
  // =======
  // const usersInfo = require('../../userInfo.json')
  // const likeHistory = require('../../likeHistory.json')

  // /* Successfully inquiry of authentication */
  // router.get('/', (req, res) => {
  //   const loginId = req.query.loginId
  //   console.log(`GET /home?loginId=${loginId}`)

  //   let body = {}
  //   const likeHistoryArr = likeHistory[loginId]
  //   Object.keys(usersInfo)
  //     .filter((userId) => !likeHistoryArr.includes(userId))
  //     .forEach((userId) => {
  //       body[userId] = usersInfo[userId]
  //     })
  //   res.status(200)
  res.send(body)
})

module.exports = router
