/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()
const fs = require('fs')

/* Import DB */
const usersInfo = require('../../userInfo.json')
const chatHistory = require('../../chatHistory.json')
const { ContextExclusionPlugin } = require('webpack')
const console = require('console')

router.post('/', (req, res) => {
  let body = undefined

  try {
    const newChat = req.body
    const userId1 = req.query.userId1
    const userId2 = req.query.userId2
    const sendDate = new Date()

    newChat.personId1 = userId1
    newChat.personId2 = userId2
    newChat.date = sendDate
    const familiarityCount = familiarityCal(chatHistory)
    newChat.familiarity = familiarityCount

    updateDataBase('./backend/chatHistory.json', newChat)

    const chatHistorys = createChatHistory(userId1, userId2)
    const maxFamiliality = familiaritySel(chatHistorys)

    const resChatHistory = chatHistorys
    for (let index = 0; index < Object.keys(resChatHistory).length; index++) {
      delete resChatHistory[index].familiarity
    }

    res.status(200)
    const body = {
      chatHistory: resChatHistory,
      familiarity: maxFamiliality,
    }
    res.send(body)
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
  const userId1 = req.query.userId1
  const userId2 = req.query.userId2

  const chatHistorys = createChatHistory(userId1, userId2)
  const maxFamiliality = familiaritySel(chatHistorys)

  const resChatHistory = chatHistorys
  for (let index = 0; index < Object.keys(resChatHistory).length; index++) {
    delete resChatHistory[index].familiarity
  }

  res.status(200)
  const body = {
    chatHistory: resChatHistory,
    familiarity: maxFamiliality,
  }

  setTimeout(() => res.send(body), 500)
})

const createChatHistory = (uid1, uid2) => {
  let newHis = []
  let chatHis = chatHistory.chats.filter(function (chatItem) {
    if ((chatItem.personId1 == uid1 && chatItem.personId2 == uid2) || (chatItem.personId1 == uid2 && chatItem.personId2 == uid1)) {
      newHis.push(Object.assign({}, JSON.parse(JSON.stringify(chatItem))))
      return true
    }
  })

  return newHis
}

const familiaritySel = (selHis) => {
  let lastFamiliarity = 0
  for (let index = 0; index < selHis.length; index++) {
    lastFamiliarity = selHis[index].familiarity
  }
  return lastFamiliarity
}

module.exports = router
