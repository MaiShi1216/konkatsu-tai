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
  //console.log(fs)
  try {
    const newChat = req.body
    //const newChat = { chats: req.body }
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

//const sendDate = new Date()
//console.log(sendDate)
//newChat.date = sendDate

const updateDataBase = (filePath, newValue) => {
  chatHistory.chats.push(newValue)
  fs.writeFileSync(filePath, JSON.stringify(chatHistory, null, 2), 'utf8')
}

const familiarityCal = (his) => {
  let sender
  for (let index = 0; index < his.chats.length; index++) {
    console.log('test output')
    console.log(his.chats[index].personId1)
    if (index === 0) {
      sender = his.chats[index].personId1
      console.log('sender0')
      console.log(sender)
      console.log('personid0')
      console.log(his.chats[index].personId1)
      familiarityCount = 0
    } else {
      console.log('index')
      console.log(index)
      console.log('sender')
      console.log(sender)
      console.log('personid1')
      console.log(his.chats[index].personId1)
      if (sender !== his.chats[index].personId1) {
        familiarityCount = familiarityCount + 1
        sender = his.chats[index].personId1
      }
    }
  }
  console.log('count')
  console.log(familiarityCount)
  return familiarityCount
}

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  //console.log(req)
  res.status(200)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //const body = usersInfo.a001
  //const body = chatHistory.a001a002
  //const body = chatHistory.chats.filter(function (chatItem) {  // 0926 change
  const chatHis = chatHistory.chats.filter(function (chatItem) {
    //if ((chatItem.personId1 == 'a001' && chatItem.personId2 == 'a002') || (chatItem.personId1 == 'a002' && chatItem.personId2 == 'a001'))
    if (
      (chatItem.personId1 == '3f328652-f4bb-4254-972a-d70489794a25' && chatItem.personId2 == 'b830fcc6-b691-462a-beb0-20a73eeed2d9') ||
      (chatItem.personId1 == 'b830fcc6-b691-462a-beb0-20a73eeed2d9' && chatItem.personId2 == '3f328652-f4bb-4254-972a-d70489794a25')
    )
      return true
  })

  //const userInfoList = Object.keys(usersInfo)

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
    console.log('body1')
    console.log(chatUserId1)
    console.log(addNickName1)
  }

  //chatHis[0].photo='aaaaaa'
  //console.log('body')
  //console.log(chatHis[0])
  //console.log('bodye')
  //console.log(Object.keys(chatHis).length)

  const body = chatHis

  setTimeout(() => res.send(body), 500)
})

module.exports = router
