/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json')

/* Successfully inquiry of authentication ここら辺の条件式を変える*/
router.get('/', (req, res) => {
  console.log(req)
  res.status(200)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const body = usersInfo.a001

  setTimeout(() => res.send(body), 500)
})

module.exports = router