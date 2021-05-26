const http = require('http')
const server = http.createServer()

const SocketIO = require('socket.io')
const io = SocketIO(server)//接管了server的upgrade事件，和request事件

io.on('connection', socket => {//socket.io连接对象
  socket.emit('chat-msg', { msg: 'hello', id: 3333 })
  socket.emit('ad', { id: 3553, content: '点击购买', buf: Buffer.from('3355669287', 'hex') })
  socket.on('foo', ary => {
    console.log(ary)
  })
})

server.on('request', async (req, res) => {
  if (req.url == '/') {
    res.end(`
      <script src="/socket.io/socket.io.js"></script>
      <script>
        var socket = io();
        socket.on('chat-msg', msg => {
          console.log(msg)
        })
        socket.emit('foo', [1,2,3])
        socket.on('ad', ad => {
          console.log(ad)
        })
      </script>
    `)
  }
})

server.listen(5006, () => {
  console.log('listening on port 5006')
})
