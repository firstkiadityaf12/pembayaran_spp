const express = require("express")
const app = express()

// call model
const siswa = require("../models/index").siswa

// mengizinkan request body
app.use(express.urlencoded({extended: true}))

// GET DATA
app.get("/:nisn", async(req, res) => {
    let nisn = {
        nisn: req.params.nisn
    }
    siswa.findOne({where: nisn, include:[{all: true, nested: true}]})
    .then(result => {
        if (result) {
            res.json({
                message: "Data ditemukan",
                data_siswa: result,
                found: true
            })
        } else {
            res.json({
                message: "data tidak ditemukan",
                found: false
            })
        }
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// auth verify
const verify = require("./auth_verify")
app.use(verify)

// GET DATA
app.get("/", async(req, res) => {
    siswa.findAll({include: [{all: true, nested: true}]})
    .then(result => {
        res.json({
            message: "Data ditemukan",
            siswa: result,
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
        nisn: req.body.nisn,
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp
    }
    siswa.create(data)
    .then(result => {
        res.json({
            message: "data berhasil ditambahkan",
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
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp
    }

    //colect nisn
    let param = {
        nisn: req.body.nisn
    }
    siswa.update(data, {where: param})
    .then(result => {
        res.json({
            message: "data berhasil diupdate",
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
app.delete("/:nisn", async(req, res) => {
    //colect data
    let param = {
        nisn: req.params.nisn
    }
    siswa.destroy({where: param})
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

//export module
module.exports = app;