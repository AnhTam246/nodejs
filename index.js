const express = require('express')
const app = express();
const usersRoute = require('./routes/users.route')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 3000;

app.listen(port, () => {
    console.log("Server listening port " + port)
});

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/users', usersRoute)

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Blue'
    });
});