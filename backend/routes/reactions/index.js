const router = require('express').Router()
const fs = require('fs')

router.post('/', (req, res) => {
  console.log('POST /reactions')
  let body = {}
  const loginId = req.body.loginId
  const selectId = req.body.selectId
  const mode = req.body.mode
  if (mode === 'like') {
    try {
      updateLikedNumInDatabase('./backend/userInfo.json', selectId)
      addLikeUser(loginId, selectId)
      res.status(200)
      body = { status: 200 }
    } catch (err) {
      console.error(err)
      res.status(500)
      body = { status: 500 }
    }
  }
  res.send(body)
})

module.exports = router

const updateLikedNumInDatabase = (filePath, targetUserId) => {
  const userInfoDatabase = JSON.parse(fs.readFileSync(filePath))
  let targetUserInfo = userInfoDatabase[targetUserId]
  if (!targetUserInfo) {
    throw 'Target user is not existed.'
  }
  targetUserInfo['likedNum']++
  userInfoDatabase[targetUserId] = targetUserInfo
  fs.writeFileSync(filePath, JSON.stringify(userInfoDatabase, null, 2), 'utf8')
}

const addLikeUser = (loginId, selectId) => {
  const likeHistoryDatabase = JSON.parse(fs.readFileSync('./backend/likeHistory.json'))
  likeHistoryDatabase[loginId].push(selectId)
  fs.writeFileSync('./backend/likeHistory.json', JSON.stringify(likeHistoryDatabase, null, 2), 'utf8')
}
