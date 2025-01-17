const client = require('../configs/db.js')
const fs = require('fs')

exports.readAll = (req, res) => {
    const page = req.query.page
    const p = req.query.p
    if (p === "amount") {
        client.query('SELECT COUNT(*) AS amount FROM fishes', [], function(err, result) {
            if (err) {
                console.log('Что-то пошло не так')
                return
            }
            res.json(result.rows[0].amount)
        })
        return
    }
    if (page === undefined) {
        client.query('SELECT * FROM fishes ORDER BY name ASC;', [], function (err, result) {
            if (err) {
               return next(err)
           }
           res.json(result.rows)
       })
    } else {
        const data = {
            rows: '',
            maxpage:''
        }
        const rowsPerPage = 7
        client.query('SELECT COUNT(*) AS rowNumber FROM fishes;', [], function (err, result) {
            if (err) {
                console.log('Ошибка на этапе подсчета')
                return
            }
            console.log(result.rows[0].rownumber)
            data.maxpage = Math.ceil(result.rows[0].rownumber / rowsPerPage)
    
            let from = rowsPerPage * (page - 1) + 1
            let to = rowsPerPage * page
    
            client.query('SELECT * FROM (SELECT id, name, description, img_src, ROW_NUMBER () OVER (ORDER BY id) FROM fishes) AS numberedRows WHERE row_number BETWEEN $1 AND $2;', [from, to], function (err, result) {
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

exports.findAll = (req, res) => {
    client.query('SELECT * FROM fishes;', [], function (err, result) {
         if (err) {
            return next(err)
        }
        res.json(result.rows)
    })
}

exports.deleteById = (req, res) => {
    let id = req.params.id
    console.log(id)
    client.query('DELETE FROM fishes WHERE id = $1;', [id], function(err, result) {
        if(err) {
            console.log('Ошибка во время удаления')
            return
        }
        res.status(200).json({status: 'ok'})
    })
}


exports.create = (req, res) => {
    const fish = {
        name: req.body.name,
        image: 'uploads/fishes/' + req.file.filename,
        description: req.body.description
    }

    client.query('INSERT INTO fishes (name, img_src, description) VALUES ($1, $2, $3);', [fish.name, fish.image, fish.description], function (err, result) {
        if (err) {
            console.log('Ошибка, не удалось выполнить запрос')
        }
        console.log('Успех')
    })

    res.status(200).json({status:"ok"})
}

exports.update = (req, res) => {
    const fish = {
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
    }

    console.log(fish)

    if (req.file !== undefined) {
        fish.image = 'uploads/fishes/' + req.file.filename
        console.log(fish)

        client.query('SELECT img_src AS image FROM fishes WHERE id = $1', [fish.id], function(err, result) {
            if(err) {
                console.log('Ошибка во время поиска ссылки на изображение')
                res.json({status:"error"})
            }
            console.log(result.rows[0].image)
            const oldLink = result.rows[0].image
            fs.unlinkSync(oldLink)

            client.query('UPDATE fishes SET name = $1, description = $2, img_src = $3 WHERE id = $4', [fish.name, fish.description, fish.image, fish.id], function (err, res) {
                if (err) {
                    console.log('Ошибка во время обновления данных')
                    return
                }
                
            })

        })
    } else {
        client.query('UPDATE fishes SET name = $1, description = $2 WHERE id = $3', [fish.name, fish.description, fish.id], function (err, res) {
            if (err) {
                console.log('Ошибка во время обновления данных')
                return
            }
            
        })
    }

    res.json({status:"ok"})
}

exports.findAllPagination = (req, res) => {
    const rowsPerPage = 10;
    let page = req.query.page
    const data = {
        rows: '',
        maxpage:''
    }

    client.query('SELECT COUNT(*) AS rowNumber FROM fishes;', [], function (err, result) {
        if (err) {
            console.log('Ошибка на этапе подсчета')
            return
        }
        data.maxpage = Math.ceil(result.rows[0].rownumber / rowsPerPage)

        let from = rowsPerPage * (page - 1) + 1
        let to = rowsPerPage * page


        client.query('SELECT * FROM (SELECT id, name, img_src, description, ROW_NUMBER () OVER (ORDER BY id) FROM fishes) AS numberedRows WHERE row_number BETWEEN $1 AND $2;', [from, to], function (err, result) {
            if (err) {
                console.log(err)
            }
            data.rows = result.rows

            res.json(data)
    })



         
    })
    
}

exports.getOne = (req, res) => {
    const id = req.params.id

    const fish = {
        baseInfo: {},
        stats: {}
    }

    client.query('BEGIN')
    .then(() => {
        return client.query('SELECT * FROM fishes WHERE id = $1', [id])
    })
    .then((result) => {
        fish.baseInfo = result.rows[0]
        return client.query('SELECT array_agg(name) AS labels, ' +
        'array_agg(round((cast(baitcount as numeric) / fishcount) * 100, 0)) as "percents" FROM ' +
        '((SELECT DISTINCT facts.bait, baits.name, COUNT(facts.bait) as "baitcount" ' + 
        'FROM facts INNER JOIN  baits ON baits.id = facts.bait WHERE facts.fish = $1 '+ 
        'GROUP BY facts.bait, facts.fish, baits.name) as q1 NATURAL JOIN ' +
        '(SELECT COUNT (fish) as "fishcount" FROM facts WHERE fish = $1) as q2)', [id])
    })
    .then((result) => {
        fish.stats.baits = result.rows[0]
        return client.query('SELECT array_agg(name) AS labels, ' +
        'array_agg(round((cast(methodcount as numeric) / fishcount) * 100, 0)) as "percents" FROM ' +
        '((SELECT DISTINCT facts.method, methods.name, COUNT(facts.method) as "methodcount" ' + 
        'FROM facts INNER JOIN methods ON methods.id = facts.method WHERE facts.fish = $1 '+ 
        'GROUP BY facts.method, facts.fish, methods.name) as q1 NATURAL JOIN ' +
        '(SELECT COUNT (fish) as "fishcount" FROM facts WHERE fish = $1) as q2)', [id])
    })
    .then((result) => {
        fish.stats.methods = result.rows[0]
        return client.query('COMMIT')
    })
    .then((result) => {
        res.status(200).json(fish)
    })
    .catch((err) => {
        console.log(err)
        return client.query('ROLLBACK')
    })
    .catch((err) => {
        console.log('Error in transaction rollback')
    })

}