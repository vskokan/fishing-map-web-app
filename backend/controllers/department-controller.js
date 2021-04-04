const client = require('../configs/db.js')

exports.readAll = (req, res) => {
    client.query('SELECT departments.id AS "departmentId", departments.adress, departments.latitude, departments.longitude, ' + 
    'departments.location, companies.id AS "companyId", companies.name AS "companyName", companies.website, companies.logo, companies.description, locations.name ' +
    'FROM departments INNER JOIN companies ON companies.id = departments.company INNER JOIN locations ON locations.id = departments.location')
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