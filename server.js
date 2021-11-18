const express = require('express')

const app = express()
const port = process.env.PORT || 5000 // port = port that heroku use bash show site f browser mashi static had number d port but if we run application localy it will maghatkhdmsh that s why andiro OR || 3000


app.get('/', (req, res) => {
    res.send('Abir Kfifat')//search for index.hbs et les arguments d'entree 
})


app.listen(port, () => {// it starts the server and function ( to run when the server is up and running)kibqa kistnt l port 3000 howa li ghadi nkhdmo bih browser
    console.log('Server is up on port:' + port)
})