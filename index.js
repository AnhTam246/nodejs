const express = require('express');
const app = express();
const usersRoute = require('./app/routes/users.route');
const authRoute = require('./app/routes/auth.route');
const staffsRoute = require('./app/routes/staffs.route');
const dashboardRoute = require('./app/routes/dashboard.route');
const specialDateRoute = require('./app/routes/specialDate.route');
const productRoute = require('./app/routes/products.route');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(process.env.PORT, () => {
    console.log("Server listening port " + process.env.PORT)
});

//API
//Example
app.use('/users', usersRoute)

app.use('/auth', authRoute)

app.use('/dashboard', dashboardRoute)

app.use('/staffs', staffsRoute)

app.use('/special-date', specialDateRoute)

app.use('/products', productRoute)

app.get('/', (req, res) => {
    res.send({'message': 'ok'});
});