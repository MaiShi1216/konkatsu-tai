/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json')
const likeHistory = require('../../likeHistory.json')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  console.log(`GET /index?userId=${req.query.userId}`)
  const userId = req.query.userId //userIdはクエリパラメータで取得
  res.status(200)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userLikes = likeHistory[userId]
  const matchedUserId = []
  const matchedUserInfo = {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (let i = 0; i < userLikes.length; i++) {
    // eslint-disable-next-line no-undef, @typescript-eslint/no-unsafe-member-access
    temp = likeHistory[userLikes[i]]
    //console.log(temp);
    // eslint-disable-next-line no-undef
    for (let k in temp) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-undef
      if (temp[k] === userId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(userLikes[i])
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        matchedUserId.push(userLikes[i])
      }
    }
  }

  for (let i = 0; i < matchedUserId.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    matchedUserInfo[matchedUserId[i]] = usersInfo[matchedUserId[i]]
  }

  res.send(matchedUserInfo)
  //setTimeout(() => res.send(matchedUserInfo), 500) //500ms待機する必要も特にない気がするのでとりあえず削除
})

module.exports = router
