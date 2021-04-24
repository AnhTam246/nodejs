const express = require('express')
const app = express();
const usersRoute = require('./routes/users.route')
const authRoute = require('./routes/auth.route')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 8787;

app.listen(port, () => {
    console.log("Server listening port " + port)
});

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/users', usersRoute)
app.use('/auth', authRoute)

app.get('/', (req, res) => {
    res.send({'message': 'ok'});
})