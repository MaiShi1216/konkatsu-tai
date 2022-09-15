// eslint-disable-next-line no-restricted-imports

/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8081
const router = require('./routes')

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
    'Origin',
    'Authorization',
    'Content-Type',
    'Accept',
    'x-api-key',
    'x-user-agent',
  ],
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '5mb' }))

app.set('port', port)
app.use('/konkatsu-backend/api/v0', router)

app.listen(app.get('port'), () => {
  console.log(`Server running on port:${String(app.get('port'))}`)
})
