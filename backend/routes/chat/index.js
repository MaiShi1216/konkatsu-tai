/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const fs = require('fs')

/* Import DB */
const usersInfo = require('../../userInfo.json')
const chatHistory = require('../../chatHistory.json')

router.post('/chat', (req, res) => {
  let body = undefined

  console.log(body)
  try {
    const newChat = req.body
    updateDataBase('./backend/chatHistory.json', newChat)

    res.status(200)
    body = { message: 'ok' }
  } catch (err) {
    console.log(err)
    res.status(500)
    body = { message: 'Internal server error' }
  }
  setTimeout(() => res.send(body))
})

const updateDataBase = (filePath, newValue) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const currentValues = JSON.parse(fs.readFileSync(filePath))
  const newValues = { ...currentValues, ...newValue }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  fs.writeFileSync(filePath, JSON.stringify(newValues, null, 2), 'utf8')
}

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  console.log(req)
  res.status(200)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //const body = usersInfo.a001
  const body = chatHistory.a001a002

  console.log(body)

  setTimeout(() => res.send(body), 500)
})

module.exports = router
