/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const fs = require('fs')

/* Import DB */
const usersInfo = require('../../userInfo.json')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  res.status(200)
  res.send(usersInfo)
})

router.put('/', (req, res) => {
  let body = undefined
  try {
    updateUserInDatabase('./backend/userInfo.json', req.query.userId, req.body)
    res.status(200)
    body = { status: 200 }
  } catch (error) {
    res.status(500)
  }
  res.send(body)
})

const updateUserInDatabase = (filePath, targetUserId, newUserInfo) => {
  const userInfoDatabase = JSON.parse(fs.readFileSync(filePath))
  let targetUserInfo = userInfoDatabase[targetUserId]
  if (!targetUserInfo) {
    throw 'Target user is not existed'
  }
  Object.keys(newUserInfo).map((property) => {
    targetUserInfo[property] = newUserInfo[property]
  })

  userInfoDatabase[targetUserId] = targetUserInfo
  fs.writeFileSync(filePath, JSON.stringify(userInfoDatabase, null, 2), 'utf8')
}

module.exports = router
