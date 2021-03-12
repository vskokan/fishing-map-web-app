const client = require('../configs/db.js')
const fs = require('fs')
const format = require('pg-format');

exports.create = (req, res) => {
    const review = {
        login: req.body.login,
        description: req.body.description,
        baiting: req.body.baiting,
        road: req.body.road == 'undefined' ? null : req.body.road,
        time: req.body.time == 'undefined' ? null : req.body.time,
        //raiting: 0,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        facts: transformFacts(JSON.parse(req.body.facts)),
       // facts: req.body.facts,
        photos: req.files
    }
    
    console.log(review)

    client.query('BEGIN')
    .then((result) => {
        return client.query('INSERT INTO reviews (login, date, description, baiting, road, time, latitude, longitude) VALUES ($1, current_date, $2, $3, $4, $5, $6, $7) returning id',
                            [review.login, review.description, review.baiting, review.road, review.time, review.latitude, review.longitude])
    })
    .then((result) => {
        const reviewId = result.rows[0].id
        console.log(reviewId)
       
        review.facts.forEach(fact => {
            fact.unshift(reviewId)
        })
       return  client.query(format('INSERT INTO facts (review, method, bait, fish) VALUES %L returning review', review.facts))
    })
    .then((result) => {
        const reviewId = result.rows[0].review
        if (req.files.length !== 0) {
            const values = []
            req.files.forEach(file => {
                values.push([reviewId, `uploads/reviews/${review.login}/`+ file.filename])
            })

            return client.query(format('INSERT INTO review_photos (review, src) VALUES %L', values))
            console.log(values)
        }
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


function transformFacts(facts) {
    let transformedFacts = []

    facts.forEach(fact => {
        fact.fishes.forEach(fish => {
            // transformedFacts.push({method: fact.method.id, bait: fact.bait.id, fish: fish.id})
            transformedFacts.push([fact.method.id, fact.bait.id, fish.id])
        })
    })

    return transformedFacts
}

exports.byId = (req, res) => {
    const reviews = []
    const review = {
        id: '',
        user: {
            login: '',
            avatar: '',
            raiting: ''
        },
        isBaiting: '',
        description: '',
        roadQuality: '',
        fishingTime: '',
        coords: {
            latitude: '',
            longitude: ''
        },
        facts: [],
        photos: []
    }

    //дальше лень
}


exports.getAll = (req, res) => {
    client.query("SELECT users.login, users.avatar, users.raiting AS userRating, reviews.id, to_char(reviews.date, 'DD.MM.YYYY') AS date, reviews.description, baiting.description AS baiting, road.description AS road, time.description AS time," +
                'reviews.latitude, reviews.longitude FROM users INNER JOIN reviews ON reviews.login = users.login INNER JOIN baiting ON baiting.id = reviews.baiting INNER JOIN road ON road.id = reviews.road INNER JOIN time ON time.id = reviews.time')
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        console.log(err)
    })
}