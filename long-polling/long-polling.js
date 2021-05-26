const http = require('http')
const readline = require('readline')

var pendingReses = []

const server = http.createServer(async (req, res) => {
  if (req.url == '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    })
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <input type="text" id="msg">
        <div id="wrapper"></div>

        <script>
          msg.addEventListener('keyup', e => {
            if (e.key == 'Enter') {
              fetch('/send-msg', {
                method: 'post',
                body: e.target.value
              })
            }
          })
          async function main() {
            for (;;) {
              var text = await fetch('/news').then(it => it.text())
              var div = document.createElement('div')
              div.innerHTML = text
              wrapper.appendChild(div)
            }
          }
          main()
        </script>
      </body>
      </html>
    `)
  }
  if (req.url == '/send-msg') {
    var body = ''
    for await (var data of req) {
      body += data.toString()
    }
    console.log(body)
    pendingReses.forEach(it => {
      it.end(body)
    })
    res.end()
  }
  if (req.url == '/news') {
    pendingReses.push(res)
  }
})

server.listen(5005, async () => {
  console.log('listening on port', 5005)

  // require('child_process').exec('chrome.exe http://localhost:5005/')

  var face = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'input news> '
  })

  face.prompt()
  for await (var line of face) {
    pendingReses.forEach(res => {
      res.end(line)
    })
    face.prompt()
  }
})
