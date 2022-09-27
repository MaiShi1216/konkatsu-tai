/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const fs = require('fs')

router.post('/', (req, res) => {
  let body
  if (!validateUserInfo(req.body, 'POST')) {
    res.status(400)
    body = { message: 'Bad Request' }
    res.send(body)
    return
  }

  try {
    const newUserId = createUserId()
    const newUser = { [newUserId]: req.body }
    createUserInDatabase('./backend/userInfo.json', newUser)

    res.status(200)
    body = { message: 'ok', userId: newUserId }
  } catch (err) {
    console.log(err)
    res.status(500)
    body = { message: 'Internal server error' }
  }
  setTimeout(() => res.send(body))
})

router.put('/', (req, res) => {
  let body = undefined
  if (!validateUserInfo(req.body, 'PUT')) {
    res.status(400)
    body = { message: 'Bad Request' }
    res.send()
    return
  }

  try {
    updateUserInDatabase('./backend/userInfo.json', req.query.userId, req.body)
    res.status(200)
    body = { message: 'ok' }
  } catch (err) {
    console.log(err)
    res.status(500)
    body = { message: 'Internal server error' }
  }
  res.send(body)
})

module.exports = router

const validateUserInfo = (userInfo, method) => {
  // TODO: 登録済みのmailアドレスか確認する
  let neededKeys
  if (method === 'POST') {
    neededKeys = ['name', 'password', 'nickname', 'email', 'isSecretMode', 'photo', 'selfIntro', 'favorites', 'hobbies', 'likedNum']
  } else {
    neededKeys = ['password', 'nickname', 'isSecretMode', 'photo', 'selfIntro', 'favorites', 'hobbies']
  }

  // for内部でreturnする場合は、forEachやarray.mapは不適切なのでfor ofを使用
  for (const key of neededKeys) {
    if (userInfo[key] === undefined || userInfo[key] === '') {
      return false
    }
  }
  return true
}

const createUserId = () => {
  // UUID format
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a) {
    let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
      v = a == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

  // TODO: 重複チェックを実装する
}

const createUserInDatabase = (filePath, newValue) => {
  const currentValues = JSON.parse(fs.readFileSync(filePath))
  const newValues = { ...currentValues, ...newValue }
  fs.writeFileSync(filePath, JSON.stringify(newValues, null, 2), 'utf8')
}

const updateUserInDatabase = (filePath, targetUserId, newUserInfo) => {
  const userInfoDatabase = JSON.parse(fs.readFileSync(filePath))
  let targetUserInfo = userInfoDatabase[targetUserId]
  if (!targetUserInfo) {
    throw 'Target user is not existed.'
  }
  Object.keys(newUserInfo).map((info) => {
    targetUserInfo[info] = newUserInfo[info]
  })

  userInfoDatabase[targetUserId] = targetUserInfo
  fs.writeFileSync(filePath, JSON.stringify(userInfoDatabase, null, 2), 'utf8')
}
