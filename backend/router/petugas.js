const express = require("express")
const app = express()

// call model
const petugas = require("../models/index").petugas

// mengizinkan request body
app.use(express.urlencoded({extended: true}))

// auth verify
const verify = require("./auth_verify")
app.use(verify)

// GET DATA
app.get("/", async(req, res) => {
    petugas.findAll({include:[{all: true, nested: true}]})
    .then(result => {
        res.json({
            petugas: result,
            found: true
        })
    })
    .catch(error => {
        res.json({
            message: error.message,
            found: false
        })
    })
})

// ADD DATA
app.post("/", async(req, res) => {
    //colect data
    let data = {
        username: req.body.username,
        password: req.body.password,
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }
    petugas.create(data)
    .then(result => {
        res.json({
            message: "Data berhasil ditambah",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// UPDATE DATA
app.put("/", async(req, res) => {
    //colect data
    let data = {
        username: req.body.username,
        password: req.body.password,
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }
    //get id
    let param = {
        id_petugas: req.body.id_petugas
    }
    petugas.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data berhasil diupdate",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// DELETE DATA
app.delete("/:id_petugas", async(req, res) => {
    //catch data
    let param = {
        id_petugas: req.body.id_petugas
    }
    petugas.destroy({where: param})
    .then(result => {
        res.json({
            message: "data berhasil dihapus",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// module export
module.exports = app;
