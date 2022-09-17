/* eslint-disable @typescript-eslint/no-var-requires */
const router = require('express').Router()

/* Import DB */
const usersInfo = require('../../userInfo.json');
const likeHistory = require('../../likeHistory.json');

/* Successfully inquiry of authentication */
router.get('/', (req, res) => {
  //const userId = req.query.userId;//userIdはクエリパラメータで取得
  const userId = "a001";//テストuserId
  //const userId = req.body;
  console.log(userId);
  res.status(200)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //const body = usersInfo.a001

  const userLikes = likeHistory[userId];
  // console.log("testtestttt");
  // console.log(userLikes);
  // console.log(likeHistory.a001)
  // console.log(likeHistory[userLikes[0]]);
  const matchedUser=[];

  for(let i = 0; i < userLikes.length; i++){
    temp = likeHistory[userLikes[i]];
    //console.log(temp);
    for(let k in temp){
      if(temp[k]===userId){
        console.log(userLikes[i])
        matchedUser.push(userLikes[i]);
      }
    }
  }

  //setTimeout(() => res.send(body), 500)
  setTimeout(() => res.send(matchedUser), 500)
})

module.exports = router
