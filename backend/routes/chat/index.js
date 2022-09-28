/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const fs = require('fs')

/* Import DB */
const usersInfo = require('../../userInfo.json')
const chatHistory = require('../../chatHistory.json')
const { ContextExclusionPlugin } = require('webpack')

router.post('/', (req, res) => {
  let body = undefined

  try {
    console.log('chatHistory')
    console.log(chatHistory)
    const newChat = req.body
    const userId1 = req.query.userId1
    const userId2 = req.query.userId2
    const sendDate = new Date()

    newChat.personId1 = userId1
    newChat.personId2 = userId2
    newChat.date = sendDate
    const familiarityCount = familiarityCal(chatHistory)
    newChat.familiarity = familiarityCount

    chatHistoryClean(chatHistory)
    updateDataBase('./backend/chatHistory.json', newChat)

    console.log('userId1')
    console.log(userId1)

    const chatHistorys = createChatHistory(userId1, userId2)
    const maxFamiliality = familiaritySel(chatHistorys)

    const resChatHistory = chatHistorys
    for (let index = 0; index < Object.keys(resChatHistory).length; index++) {
      delete resChatHistory[index].familiarity
    }

    console.log(maxFamiliality)

    //const body = chatHistorys
    const body = {
      chatHistory: resChatHistory,
      familiarity: maxFamiliality,
    }

    res.status(200)
    setTimeout(() => res.send(body), 500)

    //body = { message: 'ok' }
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

const chatHistoryClean = (clean) => {
  for (let index = 0; index < clean.chats.length; index++) {
    delete clean.chats[index].photo1
    delete clean.chats[index].nickname1
  }
}

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  const userId1 = req.query.userId1
  const userId2 = req.query.userId2

  const chatHistorys = createChatHistory(userId1, userId2)
  const maxFamiliality = familiaritySel(chatHistorys)

  const resChatHistory = chatHistorys
  for (let index = 0; index < Object.keys(resChatHistory).length; index++) {
    delete resChatHistory[index].familiarity
  }

  console.log('maxFamiliality')
  console.log(maxFamiliality)

  res.status(200)
  //const body = chatHistorys
  const body = {
    chatHistory: resChatHistory,
    familiarity: maxFamiliality,
  }

  setTimeout(() => res.send(body), 500)
})

const createChatHistory = (uid1, uid2) => {
  const chatHis = chatHistory.chats.filter(function (chatItem) {
    if ((chatItem.personId1 == uid1 && chatItem.personId2 == uid2) || (chatItem.personId1 == uid2 && chatItem.personId2 == uid1))
      return true
  })

  //for (let index = 0; index < Object.keys(chatHis).length; index++) {
  //  delete chatHis[index].familiarity
  //}
  //console.log(chatHis)
  return chatHis
}

const familiaritySel = (selHis) => {
  let lastFamiliarity
  for (let index = 0; index < selHis.length; index++) {
    lastFamiliarity = selHis[index].familiarity
    console.log('sel')
  }
  return lastFamiliarity
}

module.exports = router
