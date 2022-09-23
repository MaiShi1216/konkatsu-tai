/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json')
const likeHistory = require('../../likeHistory.json')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  const userId = req.query.userId //userIdはクエリパラメータで取得
  res.status(200)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const myLiked = likeHistory[userId]
  const matchedUserInfo = {}
  const unMatchedUserInfo = {}

  //マッチングユーザ抽出
  Object.keys(myLiked).forEach((key1) => {
    Object.keys(likeHistory[myLiked[key1]]).forEach((key2) => {
      if (likeHistory[myLiked[key1]][key2] === userId) {
        matchedUserInfo[myLiked[key1]] = usersInfo[myLiked[key1]]
      }
    })
  })

  //マッチングしていないユーザのリストを作成
  //①ユーザリストの作成
  const userIdList = Object.keys(usersInfo)
  //②matchedユーザリストの作成
  const matchedUserIdList = Object.keys(matchedUserInfo)
  //①②の差分＝unmatchedユーザリストの作成
  const unMatchedUserIdListTemp = userIdList.filter((i) => matchedUserIdList.indexOf(i) == -1)
  //自分のIDを消す
  const unMatchedUserIdList = unMatchedUserIdListTemp.filter((user) => user !== userId)
  //console.log('unMatchedUserIdList')
  //console.log(unMatchedUserIdList)

  //Unmatchedユーザのinfoを取得
  unMatchedUserIdList.forEach((key) => {
    unMatchedUserInfo[key] = usersInfo[key]
  })

  //【DTA-9】趣味が所定数以上合うユーザの抽出
  const userInfoOfHobbyMatched = {}
  const threshold = 2 //2つ以上の一致で趣味が合う
  const myHobbies = usersInfo[userId].hobbies
  unMatchedUserIdList.forEach((key1) => {
    const theirHobbies = unMatchedUserInfo[key1].hobbies
    let counter = 0
    myHobbies.forEach((key2) => {
      theirHobbies.forEach((key3) => {
        if (key2 === key3) {
          counter = counter + 1
        }
      })
    })
    if (counter >= threshold) {
      userInfoOfHobbyMatched[key1] = usersInfo[key1]
    }
  })

  //【DTA-124】自分にいいねしているユーザの抽出

  res.send(userInfoOfHobbyMatched)
  //res.send(matchedUserInfo)
})

module.exports = router
