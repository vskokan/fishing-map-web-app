const client = require('../configs/db.js')

/* CТРАНЫ */ 

exports.createCountry = (req, res) => {
    client.query('BEGIN')
    .then((result) => {
        return client.query('INSERT INTO countries (name) VALUES ($1) returning id', [req.body.name])
    })
    .then((result) => {
        const country = result.rows[0].id
        console.log(country)
        return client.query('INSERT INTO regions (name, country) VALUES ($1, $2) returning id', ['Другое', country])
    })
    .then((result) => {
        console.log(result)
        const region = result.rows[0].id
        
        return client.query('INSERT INTO locations (name, region) VALUES ($1, $2)', ['Другое', region])
    })
    .then((result) => {
        res.status(200).json({status: 'success'})
        return client.query('COMMIT')
    })
    .catch((err) => {
        console.log(err)
        return client.query('ROLLBACK')
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.readAllCountries = (req, res) => { // Выводим страны и количество областей и регионов для каждой
    client.query('SELECT countries.id AS "countryId", countries.name AS "countryName", ' +
    // 'COUNT(regions.id) AS "regions", ' +
    // 'COUNT (locations.id) AS "locations" ' +
    "array_agg(json_build_object('id', regions.id,'name',regions.name )) AS regions " +
    //'regions.id AS "regionId", regions.name AS "regionName", ' +
   // 'locations.id AS "locationId", locations.name AS "locationName" ' +
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
    client.query('INSERT INTO regions (name, country) VALUES ($1, $2) returning id',
        [req.body.name, req.body.country])
    .then((result) => {
        const region = result.rows[0].id
        return client.query('INSERT INTO locations (name, region) VALUES ($2, $1)', [region, 'Другое'])
    })
    .then((result) => {
        res.status(200).json({ message: 'Успех'})
    })
    .catch((err) => {
        console.log('Ошибка вставки в regions' + err)
    })
}

exports.readAllRegions = (req, res) => {
    let filter = (req.query.country !== undefined) ? `WHERE country = ${req.query.country} ` : ''
    console.log('FILTTTTTTTTTTTTTTTTTTTTTTTER: ', filter)
    client.query('SELECT regions.id AS "regionId", regions.name AS "regionName", ' +
    'countries.id AS "countryId", countries.name AS "countryName", COUNT(locations.id) AS "locations" FROM ' +
    'regions INNER JOIN countries ON countries.id = regions.country ' +
    'LEFT OUTER JOIN locations ON locations.region = regions.id ' + filter +
    'GROUP BY (regions.id, countries.id, countries.name)')
    .then((result) => {
        res.status(200).json(result.rows)
    })
}

/* НАСЕЛЕННЫЕ ПУНКТЫ */

exports.createLocation = (req, res) => {
    client.query('INSERT INTO locations (name, region) VALUES ($1, $2)',
        [req.body.name, req.body.region])
    .then((result) => {
        res.status(200).json({ message: 'Успех'})
    })
    .catch((err) => {
        console.log('Ошибка вставки в locations' + err)
    })
}

exports.readAllLocations = (req, res) => {
    let filter = (req.query.region !== undefined) ? ` WHERE region = ${req.query.region} ` : ''
    client.query('SELECT locations.id AS "locationId", locations.name AS "locationName", ' + 
    'regions.id AS "regionId", regions.name AS "regionName", ' +
    'countries.id AS "countryId", countries.name AS "countryName" ' +
    'FROM locations INNER JOIN regions ON regions.id = locations.region ' +
    'INNER JOIN countries ON countries.id = regions.country' + filter)
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}