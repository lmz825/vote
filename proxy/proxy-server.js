

const http = require('http')
const net = require('net')

const server = http.createServer()

server.on('request', (req, res) => {

})
server.on('upgrade', (req, res) => {

})

// CONNECT www.qq.com:443 HTTP/1.1
server.on('connect', (req, socket) => {
  console.log(req.method, req.url)
  var [host, port] = req.url.split(':')
  var conn = net.connect(+port, host, () => {
    socket.write('HTTP/1.1 200 Connect Established\r\n\r\n')
    socket.pipe(conn).pipe(socket)
  })

  conn.on('error', () => {
    conn.end()
    conn.destroy()
    socket.end()
    socket.destroy()
  })
  socket.on('error', () => {
    conn.end()
    conn.destroy()
    socket.end()
    socket.destroy()
  })
})

server.listen(1082, () => {
  console.log('ok')
})
