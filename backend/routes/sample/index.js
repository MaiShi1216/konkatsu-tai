/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json')

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  console.log(req)
  res.status(200)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const body = usersInfo['3f328652-f4bb-4254-972a-d70489794a25']

  setTimeout(() => res.send(body), 500)
})

module.exports = router
