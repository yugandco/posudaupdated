const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose');

const app = express();

const dbconfig = require('./dbconfig/config');

mongoose.Promise = global.Promise
mongoose.connect(dbconfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Mlab connected')
}).catch((err) => {
    console.log('Mlab could not be connected')
})


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-token')
    next()
})

let User = require('./models/User');
let Product = require('./models/Product');
// @USER REGISTRATION AND LOGIN
app.post('/api/registr', (req, res) => {
    console.log(req.body)
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        city: req.body.city,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    user.save(err => {
        if(err){
            return console.log(err)
            // return res.status(400).json({
            //     title: 'Пользователь с этим Email-ом уже существует :<',
            //     error: 'Попробуйте другой Email...'
            // })
        }

        return res.status(200).json({
            title: 'Great! You are new man in our home!'
        })
    })
})

app.post('/api/login', async (req, res) => {
    await User.findOne({email: req.body.email}, (err, user) => {
        if(err) return res.status(500).json({
            title: 'Server on errror',
            err
        })

        if(!user) return res.status(404).json({
            title: 'Такого пользователя с Email-ом нет!',
            error: 'Попробуйте заново!'
        })

        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login failed, please try again',
                error: 'Пароль не верный! Попробуйте еще раз!'
            })
        }

        // IF LOGIN SUCCESSFULL
        let token = jwt.sign({ userID: user._id}, 'secret')
        return res.status(200).json({
            title: 'You are login',
            token,
            user
        })
    })
})

app.post('/api/add-new-item', (req, res) => {
    let newItem = new Product({
        img: req.body.img,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        hasQty: req.body.hasQty,
        sale: req.body.sale
    })

    newItem.save(err => {
        if(err) return console.log(err)

        return res.status(200).json({
            title: 'You added new item'
        })
    }) 
})

app.get('/api/catalog', (req, res) => {
    Product.find({}, (err, products) => {
        if(err) return console.log(err)

        return res.status(200).json({
            title: 'All Products is here',
            products
        })
    })
})

// ADD TO CART
app.post('/api/catalog/:userid/:itemid', (req, res) => {
    const dd = new Date()
    Product.findOneAndUpdate({_id: req.params.itemid}, 
        { 
        $push: {
            "inCart": {
                id: req.params.userid,
                status: true,
                date: dd.now
            }
        }}, {safe: true, upsert: true, new: true}, (err) => {
            if(err) return console.log(err)

            return res.status(200).json({
                title: `Вы успешно добавили в корзину этот товар ${req.params.itemid}`
            })
        })
})

app.get('/api/cart/:userid', (req, res) => {
    Product.find({"inCart.id": req.params.userid}, (err, products) => {
        if(err) return console.log(err)

        return res.status(200).json({
            title: 'All Product is here',
            products
        })
    })
})

app.post('/api/delete-from-cart/:userid/:itemid', (req, res) => {
    Product.findOne({_id: req.params.itemid}, (err, product) => {
        if(err) return console.log(err)

        Product.updateOne({"inCart.id": req.params.userid}, {$pull: {"inCart": {id: req.params.userid}}}, {safe: true, upsert: true}, (err) => {
            if(err) return console.log(err)

            return res.status(200).json({
                title: `Вы успешно удалили этот товар ${req.params.itemid}`
            })
        })
    })
})

app.post('/api/buy-this-item/:userid/:itemid', (req, res) => {
    const dd = new Date()
    Product.findOne({_id: req.params.itemid}, (err, product) => {
        if(err) return console.log(err)

        Product.findOneAndUpdate({_id: req.params.itemid}, {
            $push: {
                "inBuy": {
                    id: req.params.userid,
                    status: true,
                    date: dd.now,
                    qty: req.body.qty,
                    sum: req.body.sum
                }
            }
        }, {safe: true, new: true, upsert: true}, (err) => {
            if(err) return console.log(err)

            return res.status(200).json({
                title: `Поздравляю вас с покупкой! ID вашего товара: ${req.params.itemid}`
            })
        })
    })
})


app.get('/api/counter/:userid', (req, res) => {
    Product.find({"inCart.id": req.params.userid}, (err, products) => {
        if(err) return console.log(err)

        return res.status(200).json({
            title: "For counting",
            products
        })
    })
})

// SEARCH ENGINE
app.get('/api/catalog/:value', (req, res) => {
    const regex = new RegExp(escapeRegex(req.params.value), 'gi');
    Product.find({title :  regex}, (err, products) => {
        if(err) return console.log(err)

        return res.status(200).json({
            title: "Result of Searching",
            products
        })
    })
})
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const PORT = process.env.PORT || 9991

app.listen(PORT, () => {
    console.log(`Server runned on port ${PORT}`)
})