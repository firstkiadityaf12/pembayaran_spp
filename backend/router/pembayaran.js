const express = require("express")
const app = express()

// call model
const pembayaran = require("../models/index").pembayaran

// mengizinkan request body
app.use(express.urlencoded({extended: true}))

//auth verify
const verify = require("./auth_verify")
app.use(verify)

// GET DATA
app.get("/", async(req, res) => {
    pembayaran.findAll({include:[{all: true, nested: true}]})
    .then(result => {
        res.json({
            pembayaran: result,
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
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: req.body.tgl_bayar,
        bulan_spp: req.body.bulan_spp,
        tahun_spp: req.body.tahun_spp,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    pembayaran.create(data)
    .then(result => {
        res.json({
            message: "Data berhasil ditambahkan",
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
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: req.body.tgl_bayar,
        bulan_spp: req.body.bulan_spp,
        tahun_spp: req.body.tahun_spp,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    //colect param
    let param = {
        id_pembayaran: req.body.id_pembayaran
    }
    pembayaran.update(data, {where: param})
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
app.delete("/:id_pembayaran", async(req, res) => {
    //colect paramater
    let param = {
        id_pembayaran: req.params.id_pembayaran
    }

    pembayaran.destroy({where: param})
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