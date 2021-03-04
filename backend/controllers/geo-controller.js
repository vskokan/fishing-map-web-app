const client = require('../db')

/* CТРАНЫ */ 

exports.createCountry = (req, res) => {
    client.query('INSERT INTO TABLE countries (name) VALUES ($1)',
        [req.body.name])
    .then((result) => {
        res.status(200).json({ message: 'Успех'})
    })
    .catch((err) => {
        console.log('Ошибка вставки в countries' + err)
    })
}

exports.readAllCountries = (req, res) => { // Выводим страны и количество областей и регионов для каждой
    client.query('SELECT countries.id AS "countryId", countries.name AS "countryName", ' +
    'COUNT(regions.id) AS "regions", ' +
    'COUNT (locations.id) AS "locations" ' +
    'FROM countries LEFT OUTER JOIN regions ON regions.country = countries.id ' + 
    'LEFT OUTER JOIN locations ON locations.region = regions.id GROUP BY (countries.id)')
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}

/* РЕГИОНЫ */

exports.createRegion = (req, res) => {
    client.query('INSERT INTO TABLE regions (name, country) VALUES ($1, $2)',
        [req.body.name, req.body.country])
    .then((result) => {
        res.status(200).json({ message: 'Успех'})
    })
    .catch((err) => {
        console.log('Ошибка вставки в regions' + err)
    })
}

exports.readAllRegions = (req, res) => {
    client.query('SELECT regions.id AS "regionId", regions.name AS "regionName", ' +
    'countries.name AS "country", COUNT(locations.id) AS "locations" FROM ' +
    'regions INNER JOIN countries ON countries.id = regions.country ' +
    'LEFT OUTER JOIN locations ON locations.region = regions.od ' +
    'GROUP BY (regions.id)')
    .then((result) => {
        res.status(200).json(result.rows)
    })
}

/* НАСЕЛЕННЫЕ ПУНКТЫ */

exports.createLocation = (req, res) => {
    client.query('INSERT INTO TABLE locations (name, region) VALUES ($1, $2)',
        [req.body.name, req.body.region])
    .then((result) => {
        res.status(200).json({ message: 'Успех'})
    })
    .catch((err) => {
        console.log('Ошибка вставки в locations' + err)
    })
}