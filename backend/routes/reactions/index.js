/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

router.post('/', (req, res) => {
  console.log('POST /reactions')
  let body = {}
  const userId = req.body.userId
  const mode = req.body.mode
  if (mode === 'like') {
    try {
      updateLikedNumInDatabase('./backend/userInfo.json', userId)
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
