/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
const users = require('../userInfo.json')
const chatHistory = require('../chatHistory.json')

const getFamiliarity = (userId) => {
  const chatArrReverse = [...chatHistory.chats].reverse()
  Object.keys(users)
    .filter((id) => id !== userId)
    .forEach((otherId) => {
      let hasChat = false
      for (const chat of chatArrReverse) {
        if (!hasChat) {
          if ((chat.personId1 === userId && chat.personId2 === otherId) || (chat.personId1 === otherId && chat.personId2 === userId)) {
            users[otherId].familiarity = chat.familiarity
            hasChat = true
          }
        }
      }
      if (!hasChat) {
        users[otherId].familiarity = 0
      }
    })

  return users
}

module.exports = getFamiliarity
