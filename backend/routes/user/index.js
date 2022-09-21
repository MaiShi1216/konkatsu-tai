/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const fs = require('fs')

router.post('/', (req, res) => {
  let body = undefined
  if (!validateUserInfo(req.body, 'POST')) {
    res.status(400)
    body = { message: 'Bad Request' }
    res.send()
    return
  }

  try {
    const newUserId = createUserId()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
  // try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // const newUser = { [req.query.userId]: req.body }
  const updatedUser = { 'a9a88123-c0bb-4807-b122-bc7363a91bf1': req.body }
  updateUserInDatabase('./backend/userInfo.json', updatedUser)

  //   res.status(200)
  //   body = { message: 'ok', userId: newUserId }
  // } catch (err) {
  //   console.log(err)
  //   res.status(500)
  //   body = { message: 'Internal server error' }
  // }
  // setTimeout(() => res.send(body))
  res.send({ message: 'OK' })
})

module.exports = router

const validateUserInfo = (userInfo, method) => {
  let neededKeys
  if (method === 'POST') {
    neededKeys = ['name', 'password', 'nickname', 'email', 'isSecretMode', 'photo', 'selfIntro', 'favorites', 'hobbies']
  } else {
    neededKeys = ['password', 'nickname', 'isSecretMode', 'photo', 'selfIntro', 'favorites', 'hobbies']
  }

  // for内部でreturnする場合は、forEachはarray.mapは不適切なのでfor ofを使用
  for (const key of neededKeys) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const currentValues = JSON.parse(fs.readFileSync(filePath))
  const newValues = { ...currentValues, ...newValue }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  fs.writeFileSync(filePath, JSON.stringify(newValues, null, 2), 'utf8')
}

const updateUserInDatabase = (filePath, newValue) => {
  // DBのアップデート
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const currentValues = JSON.parse(fs.readFileSync(filePath))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const currentUserInfo = currentValues.newValue[Object.keys[0]]
  // console.log(currentUserInfo)
  const newValues = { ...currentValues, ...newValue }
}
