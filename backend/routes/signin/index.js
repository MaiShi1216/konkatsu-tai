const router = require('express').Router()
const usersInfo = require('../../userInfo.json')

router.post('/', (req, res) => {
  console.log('POST/signin')
  const mail = req.body.mail
  const password = req.body.password

  let body = undefined
  let userBody = {}
  const userId = Object.keys(usersInfo)

  for (let i = 0; i < userId.length; i++) {
    if (mail === usersInfo[userId[i]].email && password === usersInfo[userId[i]].password) {
      res.status(200)
      userBody[userId[i]] = usersInfo[userId[i]]
      body = { status: 200, response: userBody }
    }
  }
  if (body === undefined) {
    res.status(500)
    body = { status: 500 }
  }
  res.send(body)
})

module.exports = router
