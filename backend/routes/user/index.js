/* eslint-disable no-constant-condition */
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

  if (isConflict('./backend/userInfo.json', req.body.email, 'email')) {
    res.status(409)
    body = { message: 'The email address has been registered already' }
    res.send(body)
    return
  }

  try {
    const newUserId = createUserId('./backend/userInfo.json')
    appendToDatabase('./backend/userInfo.json', { [newUserId]: req.body })

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
    updateDatabase('./backend/userInfo.json', req.query.userId, req.body)
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

const isConflict = (filePath, value, key) => {
  const currentValues = JSON.parse(fs.readFileSync(filePath))

  for (const userId of Object.keys(currentValues)) {
    if (currentValues[userId][key] === value) {
      return true
    }
  }
  return false
}

const validateUserInfo = (userInfo, method) => {
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

const createUserId = (filePath) => {
  let newUserId
  const currentValues = JSON.parse(fs.readFileSync(filePath))
  const currentUserIdList = Object.keys(currentValues)

  myLoop: while (true) {
    newUserId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a) {
      let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
        v = a == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    for (const userId of currentUserIdList) {
      if (userId === newUserId) {
        console.log(`Conflict: ${userId}`)
        continue myLoop
      }
    }
    break
  }
  return newUserId
}

const appendToDatabase = (filePath, newValue) => {
  const currentValues = JSON.parse(fs.readFileSync(filePath))
  const newValues = { ...currentValues, ...newValue }
  fs.writeFileSync(filePath, JSON.stringify(newValues, null, 2), 'utf8')
}

const updateDatabase = (filePath, targetKey, newValue) => {
  const database = JSON.parse(fs.readFileSync(filePath))
  let targetValues = database[targetKey]
  if (!targetValues) {
    throw 'Target key is not existed in the database.'
  }
  Object.keys(newValue).map((key) => {
    targetValues[key] = newValue[key]
  })

  database[targetKey] = targetValues
  fs.writeFileSync(filePath, JSON.stringify(database, null, 2), 'utf8')
}
