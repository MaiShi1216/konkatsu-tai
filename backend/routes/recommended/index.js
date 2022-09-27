/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json')
const likeHistory = require('../../likeHistory.json')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  const userId = req.query.userId //userIdはクエリパラメータで取得
  res.status(200)
  console.log('GET /recommended')

  const usersIdLikedByUser = likeHistory[userId]
  const matchedUserInfo = {}
  const unMatchedUserInfo = {}

  //マッチングユーザ抽出
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.keys(usersIdLikedByUser).forEach((key1) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    Object.keys(likeHistory[usersIdLikedByUser[key1]]).forEach((key2) => {
      if (likeHistory[usersIdLikedByUser[key1]][key2] === userId) {
        matchedUserInfo[usersIdLikedByUser[key1]] = usersInfo[usersIdLikedByUser[key1]]
      }
    })
  })

  //マッチングしていないユーザのリストを作成
  //①ユーザリストの作成
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const userIdList = Object.keys(usersInfo)
  //②matchedユーザリストの作成
  const matchedUserIdList = Object.keys(matchedUserInfo)
  //①②の差分＝unmatchedユーザリストの作成
  const unMatchedUserIdListTemp = userIdList.filter((i) => matchedUserIdList.indexOf(i) === -1)
  //自分のIDを消す
  const unMatchedUserIdList = unMatchedUserIdListTemp.filter((user) => user !== userId)

  //Unmatchedユーザのinfoを取得
  unMatchedUserIdList.forEach((key) => {
    unMatchedUserInfo[key] = usersInfo[key]
  })

  //【DTA-9】趣味が所定数以上合うユーザの抽出
  const userInfoOfHobbyMatched = {}
  const commonPoints = {} //一致した趣味のリスト
  const threshold = 2 //2つ以上の一致で趣味が合う
  const myHobbies = usersInfo[userId].hobbies
  unMatchedUserIdList.forEach((key1) => {
    const theirHobbies = unMatchedUserInfo[key1].hobbies
    const matchedHobbies = []
    let counter = 0

    myHobbies.forEach((key2) => {
      theirHobbies.forEach((key3) => {
        if (key2 === key3) {
          counter = counter + 1
          matchedHobbies.push(key3)
        }
      })
    })
    commonPoints[key1] = matchedHobbies
    if (counter >= threshold) {
      userInfoOfHobbyMatched[key1] = usersInfo[key1]
    }
  })

  //【DTA-124】自分にいいねしているユーザの抽出
  const userInfoOfLikedMe = {}
  unMatchedUserIdList.forEach((key1) => {
    const theirLikes = likeHistory[key1]
    theirLikes.forEach((key2) => {
      if (key2 === userId) {
        userInfoOfLikedMe[key1] = usersInfo[key1]
      }
    })
  })

  //送信用オブジェクトの生成
  const body = {
    recommendedByBobbies: {},
    recommendedByLikes: {},
    commonPoints: {},
  }
  body.recommendedByBobbies = userInfoOfHobbyMatched
  body.recommendedByLikes = userInfoOfLikedMe
  body.commonPoints = commonPoints

  res.send(body)
})

module.exports = router
