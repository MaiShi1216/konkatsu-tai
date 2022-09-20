/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const fs = require('fs')

router.post('/', (req, res) => {
  let body = undefined
  if (!validateUserInfo(req.body)) {
    res.status(400)
    body = { message: 'Bad Request' }
    res.send()
    return
  }

  try {
    const newUserId = createUserId()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const newUser = { [newUserId]: req.body }
    updateDataBase('./backend/userInfo.json', newUser)

    res.status(200)
    body = { message: 'ok', userId: newUserId }
  } catch (err) {
    console.log(err)
    res.status(500)
    body = { message: 'Internal server error' }
  }
  setTimeout(() => res.send(body))
})

module.exports = router

const validateUserInfo = (userInfo) => {
  const neededKeys = ['name', 'password', 'nickname', 'mail', 'mode', 'photo', 'selfIntro', 'favorites', 'hobbies']

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

const updateDataBase = (filePath, newValue) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const currentValues = JSON.parse(fs.readFileSync(filePath))
  const newValues = { ...currentValues, ...newValue }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  fs.writeFileSync(filePath, JSON.stringify(newValues, null, 2), 'utf8')
}
