const express = require("express")
const app = express()

// call model
const spp = require("../models/index").spp

// mengiziznkan requet body
app.use(express.urlencoded({extended:true}))

// auth verify
const verify = require("./auth_verify")
app.use(verify)

// GET DATA
app.get("/", async(req, res) => {
    spp.findAll({include: [{all: true, nested: true}]})
    //done
    .then(result => {
        res.json({
            message: "Data ditemukan",
            spp: result,
            found: true
        })
    })
    //false
    .catch(error => {
        res.json({
            message: error.message,
            found: true
        })
    })
})

// ADD DATA
app.post("/", async(req, res) => {
    // ambil data
    let data = {
        angkatan: req.body.angkatan,
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }

    spp.create(data)
    //done
    .then(result => {
        res.json({
            message: "Data ditambahkan",
            data: result
        })
    })
    //false
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// UPDATE DATA
app.put("/", async(req, res) => {
    //ambil data
    let data = {
        angkatan: req.body.angkatan,
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }

    //ambil id
    let param = {
        id_spp: req.body.id_spp
    }

    //update
    spp.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data berhasil di update",
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
app.delete("/:id_spp", async(req, res) => {
    //ambil data id
    let param = {
        id_spp: req.params.id_spp
    }

    spp.destroy({where: param})
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

//export router
module.exports = app;
