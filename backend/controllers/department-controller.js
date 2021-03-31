const client = require('../configs/db.js')

exports.readAll = (req, res) => {
    client.query('SELECT departments.id, departments.adress, companies.name, latitude, longitude FROM departments INNER JOIN companies ON companies.id = departments.company')
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.create = (req, res) => {
    client.query('INSERT INTO departments (company, adress, latitude, longitude) VALUES ($1, $2, $3, $4)',
    [req.body.company, req.body.adress, req.body.latitude, req.body.longitude])
    .then((result) => {
        res.status(200).json({message: 'Inserted'})
    })
    .catch((err) => {
        console.log(err)
    })
}