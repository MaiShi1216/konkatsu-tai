const express = require('express')
const app = express()
const cors = require('cors')
const port = 8081
const router = require('./routes')

app.use(express.json({ limit: '5mb' }))

app.set('port', port)

/* Dynamic origin Validation : Must define above of routing process */
app.all('*', (req, res, next) => {
  const allowedOriginList = ['http://localhost:8080', 'http://127.0.0.1:8080']
  const origin = req.headers.origin
  if (allowedOriginList.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/konkatsu-backend/api/v0', router)

app.listen(app.get('port'), () => {
  console.log(`Server running on port:${String(app.get('port'))}`)
})
