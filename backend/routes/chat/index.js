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
  //const currentValues = JSON.parse(fs.readFileSync(filePath))
  //const newValues = { ...currentValues, ...newValue }
  //let tuika = {
  //  chats: [],
  //}
  //tuika.chats.push(currentValues)
  //tuika.chats.push(newValue)  
  
  chatHistory.chats.push(newValue)
  fs.writeFileSync(filePath, JSON.stringify(chatHistory, null, 2), 'utf8')

  //currentValues.chats.push(newValue)

  //try start 
  //fs.readFileSync(filePath, 'utf8', function readFileCallbackSync(err, addData) {
  //  if (err) {
  //    console.log('fileread err')
  //    console.log(err)
  //  } else {
  //    tuika = JSON.parse(addData)
  //    console.log('tuika')
  //    console.log(tuika)   
  //    tuika.chats.push(newValue)
  //    console.log('tuikaato')
  //    console.log(tuika)   
  //    fs.writeFileSync(filePath, JSON.stringify(tuika, null, 2), 'utf8')
  //  }
  //})

  //console.log('currentValues')
  //console.log(currentValues)
  //console.log('currentValuese')
  //console.log('newValue')
  //console.log(newValue)
  //console.log('newValuee')
  //console.log('newValues')
  //console.log(newValues)
  //console.log('newValuese')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //fs.writeFileSync(filePath, JSON.stringify(newValues, null, 2), 'utf8')
  //Object.keys(newValue).map((info) => {
  //  targetUserInfo[info] = newUserInfo[info]
  //})

  //currentValues['chats'] = 'chats'
  //const a = currentValues.chats.push(newValue)
  //fs.writeFileSync(filePath, JSON.stringify(currentValues, null, 2), 'utf8')
  //fs.writeFileSync(filePath, JSON.stringify(tuika, null, 2), 'utf8')
  //fs.writeFileSync(filePath, JSON.stringify(chatHistory, null, 2), 'utf8')
  //fs.appendFileSync(filePath, JSON.stringify(tuika, null, 2), 'utf8')
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
    if ((chatItem.personId1 == '3f328652-f4bb-4254-972a-d70489794a25' && chatItem.personId2 == 'e857624e-ace4-44a5-8c9f-b9203f10df1f') || (chatItem.personId1 == 'e857624e-ace4-44a5-8c9f-b9203f10df1f' && chatItem.personId2 == '3f328652-f4bb-4254-972a-d70489794a25'))
      return true
  })

  const userInfoList = Object.keys(usersInfo)

  //const nickname1 = usersinfo[3f328652-f4bb-4254-972a-d70489794a25].nickname
  //chatHis[i].nickname1 = nickname1

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
    //console.log(usersInfo['3f328652-f4bb-4254-972a-d70489794a25'].nickname)
    console.log(chatUserId1)
    console.log(addNickName1)
  }

  
  //chatHis[0].photo='aaaaaa'
  console.log('body')
  console.log(chatHis[0])
  console.log('bodye')
  console.log(Object.keys(chatHis).length)
 
  const body = chatHis

  setTimeout(() => res.send(body), 500)
})

module.exports = router
