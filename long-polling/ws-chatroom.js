const http = require('http')
const WebSocket = require('ws')

const server = http.createServer()
const wss = new WebSocket.Server({ server });

wss.on('connection', conn => {//conn是一个ws连接
  console.log('some one connected my web socket server')
  conn.send('hello')
  setInterval(() => {
    conn.send(new Date().toISOString())
  }, 1000)
})

// server.on('upgrade', () => {// 客户端发来连接升级请求时 Connection: Upgrade
//   console.log('upgrade event triggered')
// })

server.on('request', async (req, res) => {
  if (req.url == '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end(`
      <body>ws</body>
    `)
  }
})

server.listen(5006, () => {
  console.log('listen on 5006')
})
