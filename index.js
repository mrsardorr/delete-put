const express = require('express')
const app = express()
const path = require('path')
const { create } = require('express-handlebars')

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: './views/layouts'
})

app.use(express.static(path.join('views')))
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const users = [
    { username: 'Tom', password: 'asoidaosdij', id: 1 },
    { username: 'Harry', password: 'asdijansdo', id: 2 },
    { username: 'Nyuton', password: 'odfkngondfg', id: 3 },
]

app.get('/', function (req, res) {
    res.render('index')
})
app.get('/users', function (req, res) {
    res.render('users',{
        users,
    })
})
app.get('/delete', function (req, res) {
    res.render('delete',{
        users,
    })
})

app.post('/add/user', function (req, res) {
    req.body.id = users.length + 1
    req.body.age = +req.body.age
    users.push(req.body)
    res.redirect('/users')
})

app.delete('/delete/:id', function (req, res) {
    let user = users.find(val => val.id === +req.params.id)
    if (user == undefined){
        res.send (`there is not user with id ${req.params.id}`)
    }
    let username = user.username
    let userid = user.id

    res.send(`${username} has been deleted from userlist`)

    users.splice(userid - 1,1)
})

app.put('/update/:id', function (req, res) {
    let user = users.find(val => val.id === +req.params.id)
    if (user == undefined){
        res.send (`there is not user with id ${req.params.id}`)
    }
    res.send(`${user.username} has been updated`)

    let userid = user.id
    let newuser = user
    newuser.username = req.body.name
    newuser.password = req.body.password

    users.splice(userid - 1,1)
    users.unshift(newuser)
})





const port = 9999
app.listen(port,function(){
    console.log(`nice:) port: 9999`)
})