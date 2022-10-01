const router = require('express').Router()
const fs = require('fs')

/* Import DB */
const usersInfo = require('../../userInfo.json')
const chatHistory = require('../../chatHistory.json')

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
    const familiarityCount = familiarityCal(chatHistory, userId1, userId2)
    newChat.familiarity = familiarityCount

    updateDataBase('./backend/chatHistory.json', newChat)

    const chatHistories = createChatHistory(userId1, userId2)
    const maxFamiliarity = familiaritySel(chatHistories)

    const resChatHistory = chatHistories
    for (let index = 0; index < Object.keys(resChatHistory).length; index++) {
      delete resChatHistory[index].familiarity
    }

    res.status(200)
    const body = {
      chatHistory: resChatHistory,
      familiarity: maxFamiliarity,
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

const familiarityCal = (his, uid1, uid2) => {
  let sender = 'none'
  familiarityCount = 0
  for (let index = 0; index < his.chats.length; index++) {
    if (
      (his.chats[index].personId1 == uid1 && his.chats[index].personId2 == uid2) ||
      (his.chats[index].personId1 == uid2 && his.chats[index].personId2 == uid1)
    ) {
      if (sender === 'none') {
        sender = his.chats[index].personId1
        familiarityCount = 0
      } else {
        if (sender !== his.chats[index].personId1) {
          familiarityCount = familiarityCount + 1
          sender = his.chats[index].personId1
        }
      }
    }
  }
  //対象者のchathistoryの最後の送信者と新規の送信者のuseridが異なっていればfamiliarityを1つあげる
  if (sender !== 'none') {
    if (sender !== uid1) {
      familiarityCount = familiarityCount + 1
    }
  }
  return familiarityCount
}

router.get('/', (req, res) => {
  const userId1 = req.query.userId1
  const userId2 = req.query.userId2

  const chatHistories = createChatHistory(userId1, userId2)
  const maxFamiliarity = familiaritySel(chatHistories)

  const resChatHistory = chatHistories
  for (let index = 0; index < Object.keys(resChatHistory).length; index++) {
    delete resChatHistory[index].familiarity
  }

  res.status(200)
  const body = {
    chatHistory: resChatHistory,
    familiarity: maxFamiliarity,
  }

  setTimeout(() => res.send(body), 500)
})

const createChatHistory = (uid1, uid2) => {
  let newHis = []
  chatHistory.chats.filter(function (chatItem) {
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
