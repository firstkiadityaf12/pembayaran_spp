const express = require("express")
const app = express()

// call model
const pembayaran = require("../models/index").pembayaran

// mengizinkan request body
app.use(express.urlencoded({extended: true}))