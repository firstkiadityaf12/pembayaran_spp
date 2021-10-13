const express = require("express")
const app = express()

// call model
const kelas = require("../models/index").kelas

// mengizinkan request body
app.use(express.urlencoded({extended: true}))

// auth verify
const verify = require("./auth_verify")
app.use(verify)

// GET DATA
app.get("/", async(req, res) => {
    kelas.findAll({include:[{all: true, nested: true}]})
    .then(result => {
        res.json({
            message: "Data ditemukan",
            kelas: result,
            found: true
        })
    })
    .catch(error => {
        res.json({
            message: error.message,
            found: true
        })
    })
})

// ADD DATA
app.post("/", async(req, res) => {
    // colect datr
    let data = {
        nama_kelas: req.body.nama_kelas,
        jurusan: req.body.jurusan,
        angkatan: req.body.angkatan
    }

    kelas.create(data)
    .then(result => {
        res.json({
            message: "Data telah ditambahkan",
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
    // catch data
    let data = {
        nama_kelas: req.body.nama_kelas,
        jurusan: req.body.jurusan,
        angkatan: req.body.angkatan
    }

    //catach id
    let param = {
        id_kelas: req.body.id_kelas
    }

    kelas.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data telah diupdate",
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
app.delete("/:id_kelas", async(req, res) => {
    //colect data
    let param = {
        id_kelas: req.body.id_kelas
    }
    kelas.destroy({where: param})
    .then(result => {
        res.json({
            message: "Data berhasil dihapus",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//export module
module.exports = app;