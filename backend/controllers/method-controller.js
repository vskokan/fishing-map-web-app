const client = require('../configs/db.js')

exports.create = (req, res) => {
    console.log(req.body)
    const method = {
        name: req.body.name,
        description: req.body.description
    }
    client.query('INSERT INTO methods (name, description) VALUES ($1, $2);', [method.name, method.description], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send(result)
    })
}

exports.readAll = (req, res) => {
    const page = req.query.page
    const p = req.query.p
    if (p === "amount") {
        client.query('SELECT COUNT(*) AS amount FROM methods', [], function (err, result) {
            if (err) {
                console.log(err)
                return
            }
            res.json(result.rows[0].amount)
        })
        return
    }
    if (page === undefined) {
        client.query('SELECT * FROM methods;', [], function (err, result) {
            if (err) {
                return next(err)
            }
            res.json(result.rows)
        })
    } else {
        const data = {
            rows: '',
            maxpage: ''
        }
        const rowsPerPage = 7
        client.query('SELECT COUNT(*) AS rowNumber FROM methods;', [], function (err, result) {
            if (err) {
                console.log('Ошибка на этапе подсчета')
                return
            }
            console.log(result.rows[0].rownumber)
            data.maxpage = Math.ceil(result.rows[0].rownumber / rowsPerPage)
            console.log('maxpage: ' + data.maxpage)
            console.log('page from url ', page)

            let from = rowsPerPage * (page - 1) + 1
            let to = rowsPerPage * page
            console.log(from, to)

            client.query('SELECT * FROM (SELECT id, name, description, ROW_NUMBER () OVER (ORDER BY id) FROM methods) AS numberedRows WHERE row_number BETWEEN $1 AND $2;', [from, to], function (err, result) {
                if (err) {
                    console.log(err)
                }
                data.rows = result.rows
                console.log(data)
                res.json(data)
            })
        })
    }
}

exports.readOne = (req, res) => {
    let id = String(req.params.id)
    client.query('SELECT * FROM methods WHERE id = $1;', [id], function (err, result) {
        if (err) {
            return next(err)
        }
        res.json(result.rows)
    })
}

exports.update = (req, res) => {
    let id = req.query.id
    console.log(id)

    const method = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
    }

    client.query('UPDATE methods SET name = $1, description = $2 WHERE id = $3;', [method.name, method.description, method.id], function (err, result) {
        if (err) {
            console.log('Ошибка во время обновления')
            return
        }
        res.json(result.rows)
    })
}

exports.deleteById = (req, res) => {
    let id = req.params.id
    client.query('DELETE FROM methods WHERE id = $1;', [id], function (err, result) {
        if (err) {
            console.log('Ошибка во время удаления')
            return
        }
        res.status(200).json({
            status: 'ok'
        })
    })
}

exports.deleteAll = (req, res) => {
    client.query('DELETE * FROM methods;', [], function (err, result) {
        if (err) {
            return next(err)
        }
        result = 'Удалено'
        res.send(result)
    })
}