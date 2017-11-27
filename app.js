var express = require('express')
var path = require('path');

var app = express()



//Serve static files for the game
app.use(express.static('static'))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
