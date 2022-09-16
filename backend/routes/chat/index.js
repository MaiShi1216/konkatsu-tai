/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json')
const chatHistory = require('../../chatHistory.json')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  console.log(req)
  res.status(200)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const body = usersInfo.a001
  const chatBody = chatHistory.chats

  setTimeout(() => res.send(body), 500)
  setTimeout(() => res.send(chatBody), 500)
})

module.exports = router
