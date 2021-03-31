const client = require('../configs/db.js')
const fs = require('fs')

exports.create = (req, res) => {
    client.query('INSERT INTO companies (name, description, email, website, logo, gives_discounts) ' +
    'VALUES ($1, $2, $3, $4, $5, $6)',
    [
        req.body.name, 
        req.body.description, 
        req.body.email, 
        req.body.website, 
        'uploads/companies/' + req.file.filename,
        req.body.gives_discounts
    ])
    .then((result) => {
        res.status(200).json({status: 'success'})
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.readAll = (req, res) => {
    client.query('SELECT * FROM companies')
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}