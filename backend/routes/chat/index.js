/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const fs = require('fs')

/* Import DB */
const usersInfo = require('../../userInfo.json')
const chatHistory = require('../../chatHistory.json')
const { ContextExclusionPlugin } = require('webpack')

router.post('/', (req, res) => {
  let body = undefined

  console.log('chat update')
  try {
    const newChat = req.body
    const sendDate = new Date()
    newChat.date = sendDate
    console.log(chatHistory)
    const familiarityCount = familiarityCal(chatHistory)
    newChat.familiarity = familiarityCount
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
  chatHistory.chats.push(newValue)
  fs.writeFileSync(filePath, JSON.stringify(chatHistory, null, 2), 'utf8')
}

const familiarityCal = (his) => {
  let sender
  for (let index = 0; index < his.chats.length; index++) {
    if (index === 0) {
      sender = his.chats[index].personId1
      familiarityCount = 0
    } else {
      if (sender !== his.chats[index].personId1) {
        familiarityCount = familiarityCount + 1
        sender = his.chats[index].personId1
      }
    }
  }
  return familiarityCount
}

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  res.status(200)
  const chatHis = chatHistory.chats.filter(function (chatItem) {
    if (
      (chatItem.personId1 == '3f328652-f4bb-4254-972a-d70489794a25' && chatItem.personId2 == 'b830fcc6-b691-462a-beb0-20a73eeed2d9') ||
      (chatItem.personId1 == 'b830fcc6-b691-462a-beb0-20a73eeed2d9' && chatItem.personId2 == '3f328652-f4bb-4254-972a-d70489794a25')
    )
      return true
  })

  for (let index = 0; index < Object.keys(chatHis).length; index++) {
    let chatUserId1 = chatHis[index].personId1
    let chatUserId2 = chatHis[index].personId2
    let addNickName1 = usersInfo[chatUserId1].nickname
    let addNickName2 = usersInfo[chatUserId2].nickname
    let addPhoto1 = usersInfo[chatUserId1].photo
    let addPhoto2 = usersInfo[chatUserId1].photo
    chatHis[index].nickname1 = addNickName1
    chatHis[index].nickname2 = addNickName2
    chatHis[index].photo1 = addPhoto1
    chatHis[index].photo2 = addPhoto2
  }

  const body = chatHis

  setTimeout(() => res.send(body), 500)
})

module.exports = router
