const { json } = require('body-parser')
const client = require('../db')

// exports.findAll = (req, res) => {
//     client.query('SELECT id, login, to_char(reviews.reviewDate, $2) AS date, description, isbaiting, roadquality, fishingtime, raiting, latitude, longitude FROM reviews;', [], function (err, result) {
//          if (err) {
//             return next(err)
//         }
//         res.json(result.rows)
//     })
// }

exports.findOneByParameter = (req, res) => {
    let parameter = req.body.parameter
    let value = String(req.body.value)
    client.query('SELECT * FROM reviews WHERE $1 = $2', [parameter, value], function (err, result) {
        if (err) {
            return next(err)
        }   
        res.send(result)
    })
}

exports.create = (req, res) => {
    const review = {
        login: req.body.login,
        //reviewDate: req.body.reviewDate,
        description: req.body.description,
        isBaiting: req.body.isBaiting,
        roadQuality: req.body.roadQuality,
        fishingTime: req.body.fishingTime,
        raiting: 0,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }
    console.log(review)
    client.query('INSERT INTO reviews (login, date, description, isbaiting, roadquality, fishingtime, raiting, latitude, longitude) VALUES ($1, current_date, $2, $3, $4, $5, $6, $7, $8);', [review.login, review.description, review.isBaiting, review.roadQuality,review.fishingTime, review.raiting, review.latitude, review.longitude], function (err, result) {
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
        client.query('SELECT COUNT(*) AS amount FROM reviews', [], function (err, result) {
            if (err) {
                console.log('Что-то пошло не так')
                return
            }
            res.json(result.rows[0].amount)
        })
        return
    }
    if (page === undefined) {

        client.query("SELECT reviews.id, login, to_char(date, 'DD.MM.YYYY') AS date, description, baiting.description AS baiting, road.description AS road, time.description AS time, raiting, latitude, longitude FROM reviews" +
        "INNER JOIN baiting ON baiting.id = reviews.baiting INNER JOIN road ON road.id = reviews.road" +
        "INNER JOIN time ON time.id = reviews.time", [], function (err, result) {
            if (err) {
                return next(err)
            }
            console.log(result.rows)
            res.json(result.rows)
        })
    } else {
        const data = {
            rows: '',
            maxpage: ''
        }
        const rowsPerPage = 7
        client.query('SELECT COUNT(*) AS rowNumber FROM reviews;', [], function (err, result) {
            if (err) {
                console.log('Ошибка на этапе подсчета')
                return
            }
            //console.log(result.rows[0].rownumber)
            data.maxpage = Math.ceil(result.rows[0].rownumber / rowsPerPage)
            //console.log('maxpage: ' + data.maxpage)
            //console.log('page from url ', page)

            let from = rowsPerPage * (page - 1) + 1
            let to = rowsPerPage * page
            //console.log(from, to)

            client.query("SELECT * FROM (SELECT id, login, to_char(date, 'DD.MM.YYYY') AS date, description, baiting, road, time, latitude, longitude, ROW_NUMBER () OVER (ORDER BY id) FROM reviews) AS numberedRows WHERE row_number BETWEEN $1 AND $2;", [from, to], function (err, result) {
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

exports.createWithPromises = (req, res) => {
    const review = {
        login: req.body.login,
        description: req.body.description,
        isBaiting: req.body.isBaiting,
        roadQuality: req.body.roadQuality,
        fishingTime: req.body.fishingTime,
        raiting: 0,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }

    client.query('BEGIN')
    .then((result) => {
        return client.query('INSERT INTO reviews (login, date, description, isbaiting, roadquality, fishingtime, raiting, latitude, longitude) VALUES ($1, current_date, $2, $3, $4, $5, $6, $7, $8)',
                            [review.login, review.description, review.isBaiting, review.roadQuality,review.fishingTime, review.raiting, review.latitude, review.longitude])
    })
    .then((result) => {
        return client.query('UPDATE users SET raiting = raiting + 10 WHERE login = $1', 
                            [review.login])
    })
    .then((result) => {
        return client.query('commit')
    })
    .then((result) => {
        console.log('Транзакция вроде сработала')
        result = { status: 'ok' }
        res.send(result)
    })
    .catch((err) => {
        console.log('Ошибка в транзакции, откат: ', err)
        return client.query('ROLLBACK')
    })
    .catch((err) => {
        console.log('Ошибка во время отката: ', err)
    })
}

exports.update = (req, res) => {
    const review = {
        id: req.params.id,
        description: req.body.description,
        isBaiting: req.body.isBaiting,
        roadQuality: req.body.isBaiting,
        fishingTime: req.body.fishingTime,
        raiting: req.body.raiting,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }

    // client.query('UPDATE reviews SET desription = $1, isbaiting = $2, roadquality = $3, fishingtime = $4, raiting = $5, latitude = $6, longitude = $7 WHERE id = $8', [review.description, review.isBaiting, review.roadQuality, review.fishingTime, review.raiting, review.latitude, review.longitude], function (err, result) {
    //     if (err) {
    //         console.log('Ошибка на этапе обновления')
    //         return
    //     }
    //     client.query('UPDATE users SET raiting = raiting + 10 WHERE login in (SELECT login FROM reviews WHERE id = $1)', [review.id], function(err, result) {
    //         if (err) {
    //             console.log('Ошибка на этапе зачисления рейтинга')
    //         }
    //         return
    //     })
    //     res.send(result)
    // })

    client.query('UPDATE reviews SET description = $1, isbaiting = $2, roadquality = $3, fishingtime = $4, raiting = $5, latitude = $6, longitude = $7 WHERE id = $8', 
                [review.description, review.isBaiting, review.roadQuality, review.fishingTime, review.raiting, review.latitude, review.longitude, review.id])
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log('Ошибо4ка: ', err)
    })

    console.log(review)
}


exports.getPhotos = (req, res) => {
    const id = req.params.id

    client.query('SELECT * FROM review_photos WHERE review = $1', [id])
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.getOptions = (req, res) => {
    const options = {
        baiting: [],
        time: [],
        road: []
    }
    client
    .query('BEGIN')
    .then(() => {
        return client.query('SELECT * FROM baiting')
    })
    .then((result) => {
        options.baiting = result.rows
        return client.query('SELECT * FROM time')
    })
    .then((result) => {
        options.time = result.rows
        return client.query('SELECT * FROM road')
    })
    .then((result) => {
        options.road = result.rows
        return client.query('COMMIT')
    })
    .then((result) => {
        res.status(200).json(options)
    })
    .catch((err) => {
        console.log(err)
        return client.query('ROLLBACK')
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.delete = (req, res) => {
    client.query('DELETE FROM reviews WHERE id = $1', [req.params.id])
    .then((result) => {
        res.status(200).json({message: 'Deleted'})
    })
    .catch((err) => {
        console.log(err)
    })

    // ДОПИСАТЬ УДАЛЕНИЕ ФОТОК ОТЗЫВОВ ИЗ ПАПКИ !!!!!!ВАЖНО!!!!!!
}

exports.getFull= (req, res) => {
    const review = {
        baseInfo: {
        },
        facts: [],
        photos: [],
        rating: '',
        reports: ''
    }

    client.query('BEGIN')
    .then(() => {
        return client.query("SELECT login, to_char(date, 'DD.MM.YYYY') AS date, " + 
            'reviews.description, baiting.id AS "baitingId", baiting.description AS "baitingDescription", ' + 
            'road.id AS "roadId", road.description AS "roadDescription", ' +
            'time.id AS "timeId", time.description AS "timeDescription", latitude, longitude FROM reviews ' +
            'INNER JOIN baiting ON baiting.id = reviews.baiting INNER JOIN road ON road.id = reviews.road ' +
            'INNER JOIN time ON time.id = reviews.time WHERE reviews.id = $1', 
            [req.params.id])
    })
    .then((result) => {
        review.baseInfo = result.rows[0]
        return client.query('SELECT facts.id AS fact, ' + 
            'fishes.id AS "fishId", fishes.name AS "fishName", ' + 
            'baits.id AS "baitId", baits.name AS "baitName", baits.description AS "baitDescription", ' + 
            'methods.id AS "methodId", methods.name AS "methodName", methods.description AS "methodDescription" ' + 
            'FROM facts INNER JOIN reviews ON reviews.id = facts.review INNER JOIN fishes ON fishes.id = facts.fish ' + 
            'INNER JOIN baits ON baits.id = facts.bait INNER JOIN methods ON methods.id = facts.method WHERE review = $1;',
            [req.params.id])
    })
    .then((result) => {
        review.facts = formatFacts(result.rows)
        return client.query('SELECT id, src FROM review_photos WHERE review = $1', [req.params.id])
    })
    .then((result) => {
        review.photos = result.rows
        return client.query('SELECT SUM(vote) AS rating FROM review_stats WHERE review = $1 GROUP BY review', [req.params.id])
    })
    .then((result) => {
        review.rating = (result.rows.length ==0) ? 0 : result.rows[0].rating
        return client.query('SELECT COUNT(*) AS reports FROM review_stats WHERE review = $1 AND report = true', [req.params.id])
    })
    .then((result) => {
        review.reports = (result.rows.length ==0) ? 0 : result.rows[0].reports
        return client.query('COMMIT')
    })
    .then((result) => {
        res.status(200).json({review: review})
    })
    .catch((err) => {
        console.log(err)
        return client.query('ROLLBACK')
    })
    .catch((err) => {
        console.log(err)
    })
    
}

exports.getAll = (req, res) => {
    let reviews = []
    client.query('BEGIN')
    .then(() => {
        return client.query("SELECT reviews.id, reviews.login, to_char(date, 'DD.MM.YYYY') AS date, SUM(review_stats.vote), " + 
            'reviews.description, baiting.id AS "baitingId", baiting.description AS "baitingDescription", ' + 
            'road.id AS "roadId", road.description AS "roadDescription", ' +
            'time.id AS "timeId", time.description AS "timeDescription", latitude, longitude FROM reviews ' +
            'INNER JOIN baiting ON baiting.id = reviews.baiting INNER JOIN road ON road.id = reviews.road ' +
            'INNER JOIN time ON time.id = reviews.time LEFT OUTER JOIN review_stats ON review_stats.review = reviews.id '
            +
            'GROUP BY reviews.id, baiting.id, road.id, time.id'
            )
    })
    .then((result) => {
        reviews = result.rows
        return client.query('COMMIT')
    })
    .then((result) => {
        res.status(200).json({reviews: reviews})
    })
    .catch((err) => {
        console.log(err)
        return client.query('ROLLBACK')
    })
    .catch((err) => {
        console.log(err)
    })
} 




function formatFacts(facts) {
    const formatedFacts = []
    let fishes = []
    const combinations = formCombinations(facts)

    combinations.forEach(combination => {
        facts.forEach(fact => {
            if (fact.baitId == combination.bait.id && fact.methodId == combination.method.id) {
                fishes.push(
                    {
                        id: fact.fishId,
                        name: fact.fishName
                    }
                )
            }
        })
        console.log(combination)
        console.log(fishes)
        formatedFacts.push(
            {
                combination: combination,
                fishes: fishes
            }
        )

        fishes = []
    })

    return formatedFacts
}

function formCombinations(facts) {
    const combinations = []

    facts.forEach(fact => {
        combinations.push(
            { 
                bait: { 
                    id: fact.baitId, 
                    name: fact.baitName, 
                    description: fact.baitDescription 
                }, 
                method: { 
                    id:  fact.methodId,
                    name: fact.methodName, 
                    description: fact.methodDescription 
                }
            }
        )
    })

    // let reducedCombinations = 
    // console.log('skhfkjfk')
    // console.log(reduceArrayOfObjects(reducedCombinations))
    return reduceArrayOfObjects(combinations)
}

function reduceArrayOfObjects(array) {
    let reducedArray = []

    if (array.length == 1) {
        reducedArray = array
    } else {
        for (let i = 0; i < array.length; i++) {
            let isExist = false

            for (let j = 0; j < reducedArray.length; j++) {
                if (array[i].bait.id == reducedArray[j].bait.id && array[i].method.id == reducedArray[j].method.id) isExist = true
            }

            if (!isExist) {
                reducedArray.push(array[i])
            }
        }
    }

    return reducedArray
    //console.log('REDUCED', reducedArray)
}