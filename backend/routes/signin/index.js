/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const usersInfo = require('../../userInfo.json')

/* Successfully inquiry of authentication ここら辺の条件式を変える*/
// req.bodyでFEからのリクエスト情報を取得可能 --> そこからさらにメールアドレスを取得する
router.post('/', (req, res) => {
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
  //一致するものがあるとき、status: 200, userの情報がFEに渡される
  //一致するものがないとき、status: 500がFEに渡される
  res.send(body)
  // res.json({'mail:'mail'})
  // const userInfo = req.body
  // // userInfo.jsonの情報を取得して、for of文でループする(他の人のコードで実装しているんどえ参考に)
  //   for (let i = 0; i < usersInfo.length; i++) {
  //     userInfo === userInfo
  //     res.status(200)
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //     const body = usersInfo.a001
  //   // }else {
  //     setTimeout(() => res.send(body), 500)
  //       }
})
// for of文で取得した各ユーザーのemailアドレスと、req.bodyから取得したメールアドレスが一致していたら、そのuser情報を取得する
//   res.send(body)

module.exports = router

// App.post('/add', function (request, response) {
//   let data = request.body
//   console.log(data)
// })
