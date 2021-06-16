const client = require('../configs/db.js')

/* CТРАНЫ */ 

exports.createCountry = (req, res) => {
   client.query('INSERT INTO countries (name) VALUES ($1)', [req.body.name])
    .then((result) => {
        res.status(200).json({status: 'success'})
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.readAllCountries = (req, res) => { 
    client.query('SELECT countries.id AS "countryId", countries.name AS "countryName", ' +
    "array_agg(json_build_object('id', regions.id,'name',regions.name )) AS regions " +
    'FROM countries LEFT OUTER JOIN regions ON regions.country = countries.id ' + 
    'LEFT OUTER JOIN locations ON locations.region = regions.id GROUP BY (countries.id) ORDER BY countries.name')
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.updateCountry = (req, res) => {
    client.query('UPDATE countries SET name = $1 WHERE id = $2', [req.body.name, req.params.id])
    .then((result) => {
        res.status(200).json({message: 'updated'})
    })
}

exports.deleteCountry = (req, res) => {
    client.query('DELETE FROM countries WHERE id = $1', [req.params.id])
    .then((result) => {
        res.status(200).json({message: 'deleted'})
    })
    .catch((err) => {
        console.log(err)
    })
}

/* РЕГИОНЫ */

exports.createRegion = (req, res) => {
    client.query('INSERT INTO regions (name, country) VALUES ($1, $2)',
        [req.body.name, req.body.country])
    .then((result) => {
        res.status(200).json({ message: 'Успех'})
    })
    .catch((err) => {
        console.log('Ошибка вставки в regions' + err)
    })
}

exports.readAllRegions = (req, res) => {
    let filter = (req.query.country !== undefined) ? `WHERE country = ${req.query.country} ` : ''
    client.query('SELECT regions.id AS "regionId", regions.name AS "regionName", ' +
    'countries.id AS "countryId", countries.name AS "countryName", COUNT(locations.id) AS "locations" FROM ' +
    'regions INNER JOIN countries ON countries.id = regions.country ' +
    'LEFT OUTER JOIN locations ON locations.region = regions.id ' + filter +
    'GROUP BY (regions.id, countries.id, countries.name) ORDER BY regions.id')
    .then((result) => {
        res.status(200).json(result.rows)
    })
}

exports.updateRegions = (req, res) => {
    //console.log(req.body.name)
    client.query('UPDATE regions SET name = $1 WHERE id = $2', [req.body.name, req.params.id])
    .then((result) => {
        res.status(200).json({message: 'updated'})
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.deleteRegion = (req, res) => {
    client.query('DELETE FROM regions WHERE id = $1',[req.params.id])
    .then((result) => {
        res.status(200).json({message: 'deleted'})
    })
    .catch((err) => {
        console.log(err)
    })
}

/* НАСЕЛЕННЫЕ ПУНКТЫ */

exports.createLocation = (req, res) => {
    console.log('имя ' + req.body.name)
    console.log('регмон ' + req.body.region)
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
    'countries.id AS "countryId", countries.name AS "countryName", ' +
    'COUNT(departments.id) as "departmentsAmount" ' +
    'FROM locations INNER JOIN regions ON regions.id = locations.region ' +
    'INNER JOIN countries ON countries.id = regions.country ' +
    'LEFT OUTER JOIN departments ON departments.location = locations.id ' +
    filter + ' GROUP BY locations.id, regions.id, countries.id ORDER BY locations.id')
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.deleteLocation = (req, res) => {
    client.query('DELETE FROM locations WHERE id = $1', [req.params.id])
    .then((result) => {
        res.status(200).json({message: 'deleted'})
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.updateLocation = (req, res) => {
    console.log(req.body.name)
    client.query('UPDATE locations SET name = $1 WHERE id = $2', [req.body.name, req.params.id])
    .then((result) => {
        res.status(200).json({message: 'updated'})
    })
    .catch((err) => {
        console.log(err)
    })
}