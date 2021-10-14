const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const md5 = require('md5')

//call model 
const petugas = require("../models/index").petugas

//izinkan request body
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post('/', async (req, res) => {
    //ambildata
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        level: req.body.level
    }

    //put result
    let result = await petugas.findOne({where: data})
    if (result === null) {
        res.json({
            message: "Invalid username or password",
            logged: false
        })
    } else {
        // jwt
        // expiresIn: exp.expToken // 1s 1h 1d 1w 1y
        let jwtHeader = {
            algorithm: "HS256"
        }
        let payload = {
            data: result
        }
        let secretKey = "mokletspp"
        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token,
            logged: true
        })
    }
})

//module export
module.exports = app;
