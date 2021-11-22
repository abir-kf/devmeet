const express = require('express')
const connectDB = require('./config/db')

const app = express()

//Connect Database
connectDB();



//Init Middleware : to get inputs
app.use(express.json({ extended: false}));


app.get('/', (req, res) => {
    res.send('Api running')//search for index.hbs et les arguments d'entree 
})


//Define Routes
app.use('/api/auth', require('./routes/api/auth')) 
app.use('/api/posts', require('./routes/api/posts')) 
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/users', require('./routes/api/users')) 



const port = process.env.PORT || 5000 // port = port that heroku use bash show site f browser mashi static had number d port but if we run application localy it will maghatkhdmsh that s why andiro OR || 3000

app.listen(port, () => {// it starts the server and function ( to run when the server is up and running)kibqa kistnt l port 3000 howa li ghadi nkhdmo bih browser
    console.log('Server is up on port:' + port)
})