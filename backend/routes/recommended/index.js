/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json')
const likeHistory = require('../../likeHistory.json')
const addFamiliarityToUsersInfo = require('../../utils/function')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  const loginId = req.query.loginId
  console.log(`GET /recommended?loginId=${loginId}`)
  const usersInfoWithFamiliarity = addFamiliarityToUsersInfo(loginId)

  const yetLikeUserInfo = {}
  const likeHistoryArr = likeHistory[loginId]
  const yetLikeUserIdList = Object.keys(usersInfo)
    .filter((userId) => (likeHistoryArr ? !likeHistoryArr.includes(userId) : true))
    .filter((userId) => userId !== loginId)
  yetLikeUserIdList.forEach((userId) => {
    yetLikeUserInfo[userId] = usersInfoWithFamiliarity[userId]
  })

  //【DTA-9】趣味が所定数以上合うユーザの抽出
  const userInfoOfHobbyMatched = {}
  const commonPoints = {} //一致した趣味
  const threshold = 2 //2つ以上の一致で趣味が合う
  const myHobbies = usersInfo[loginId].hobbies
  yetLikeUserIdList.forEach((key1) => {
    const theirHobbies = yetLikeUserInfo[key1].hobbies
    const matchedHobbies = []
    let counter = 0

    myHobbies.forEach((key2) => {
      theirHobbies.forEach((key3) => {
        if (key2 === key3) {
          counter++
          matchedHobbies.push(key3)
        }
      })
    })
    commonPoints[key1] = matchedHobbies
    if (counter >= threshold) {
      userInfoOfHobbyMatched[key1] = usersInfoWithFamiliarity[key1]
    }
  })

  //【DTA-124】自分にいいねしているユーザの抽出
  const userWhoLikedMe = {}
  yetLikeUserIdList.forEach((key1) => {
    const theirLikes = likeHistory[key1]
    theirLikes.forEach((key2) => {
      if (key2 === loginId) {
        userWhoLikedMe[key1] = usersInfoWithFamiliarity[key1]
      }
    })
  })

  const body = {}
  body.recommendedByHobbies = userInfoOfHobbyMatched
  body.recommendedByLikes = userWhoLikedMe
  body.commonPoints = commonPoints
  res.status(200)
  res.send(body)
})

module.exports = router
