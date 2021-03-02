//const ExpressFormidable = require('express-formidable') Надо бы удалить это вообще
const client = require('../db')
const bcrypt = require('bcrypt')
const fs = require('fs')
const salt = bcrypt.genSaltSync(10)


exports.create = (req, res) => {
    const user = {
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        admin: 0,
        name: 'Не указано',
        location: req.body.place,
        avatar: 'uploads/users/default.jpeg',
        ban: 0,
        raiting: 0
    }

     //что такое соль? почитать про то как это работает
    user.hashedPassword = bcrypt.hashSync(user.password, salt)

    client.query('INSERT INTO users (login, email, password, admin, name, location, avatar, ban, raiting) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);', [user.login, user.email, user.hashedPassword, user.admin, user.name, user.place, user.avatar, user.raiting], function (err, result) {
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
        client.query('SELECT COUNT(*) AS amount FROM users', [], function(err, result) {
            if (err) {
                console.log('Что-то пошло не так')
                return
            }
            res.json(result.rows[0].amount)
        })
        return
    }
    if (page === undefined) {
        client.query('SELECT * FROM users;', [])
        .then((result) => {
            res.status(200).json(result.rows)
        }) 
        .catch((err) => {
            console.log(err)
        })          
       
    } else {
        const data = {
            rows: '',
            maxpage:''
        }
        const rowsPerPage = 7
        client.query('SELECT COUNT(*) AS rowNumber FROM users;', [], function (err, result) {
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
    
            client.query('SELECT * FROM (SELECT login, email, password, admin, name, location, avatar, ban, raiting, ROW_NUMBER () OVER (ORDER BY login) FROM users) AS numberedRows WHERE row_number BETWEEN $1 AND $2;', [from, to], function (err, result) {
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
//     let id = String(req.params.id)
//     client.query('SELECT * FROM users WHERE login = $1;', [id], function (err, result) {
//         if (err) {
//            return next(err)
//        }
//        res.json(result.rows)
//    })
    console.log('USER READ ONE')
    let user = {
        login:  req.params.login,
        name: '',
        avatar: '',
        location: '',
        email: '',
        admin: '',
        ban: '',
        rating: '',
        reviewsAmount: '',
        frqMethod: '',
        frqFish: ''
    }

    client.query('BEGIN')
    .then(() => { // сначала заносим базовую инфу
        return client.query('SELECT login, users.name, avatar, locations.name AS location, email, admin, ban ' + 
        'FROM users INNER JOIN locations ON locations.id = users.location WHERE login = $1', 
        [user.login])
    })
    .then((result) => {
        user.name = result.rows[0].name
        user.avatar = result.rows[0].avatar
        user.location = result.rows[0].location
        user.email = result.rows[0].email
        user.admin = result.rows[0].admin
        user.ban = result.rows[0].ban

        return client.query('SELECT COUNT(reviews.id) AS amount FROM reviews WHERE reviews.login = $1',
        [user.login])
    })
    .then((result) => {
        user.reviewsAmount = result.rows[0].amount
        return client.query('SELECT SUM(review_stats.vote) AS sum FROM review_stats INNER JOIN ' +
        'reviews ON reviews.id = review_stats.review WHERE reviews.login = $1',
        [user.login])
    })
    .then((result) => {
        user.rating = user.reviewsAmount * 100 + +result.rows[0].sum
        console.log(user)
        return client.query('COMMIT')
    })
    .then((result) => {
        res.status(200).json(user)
    })
    .catch((err) => {
        console.log('ошибка в рюзер')
    })
}

exports.update = (req, res) => {

    const user = {
        login: req.body.login,
        oldLogin: req.params.login,
        email: req.body.email,
        //password: req.body.password,
        admin: req.body.admin,
        name: req.body.name,
        place: req.body.place,
        raiting: req.body.raiting
    }
    
    console.log(user)
    //Хеширование пароля для обновления в базе

     // может асинхронно?
    //user.hashedPassword = bcrypt.hashSync(user.password, salt)

    //Обновление данных пользователя в зависимости от наличия файла изображения в зарпросе
    console.log(req.file)
    if (req.file !== undefined) {
        user.avatar = 'uploads/users/' + req.file.filename

        client.query('SELECT avatar AS avatar FROM users WHERE login = $1', [user.login], function(err, result) { //Надо бы через промисы...
            if(err) {
                console.log('Ошибка во время поиска ссылки на изображение')
                res.json({status:"error"})
            }
            console.log(result)
            const oldLink = result.rows[0].avatar
            if (oldLink !== 'uploads/users/default.jpeg') {
                fs.unlinkSync(oldLink)
            }
            
            client.query('UPDATE users SET login = $1, email = $2, admin = $3, name = $4, location = $5, avatar = $6, raiting = $7 WHERE login = $8', [user.login, user.email, user.admin, user.name, user.place, user.avatar, user.raiting, user.oldLogin], function (err, res) {
                if (err) {
                    console.log('Ошибка во время обновления данных')
                    return
                    // res.json({status:"error"})
                }

                // res.status(200).json({
                //     status: 'ok'
                // })              
            })
        })
    } else {
        client.query('UPDATE users SET login = $1, email = $2, admin = $3, name = $4, location = $5, raiting = $6 WHERE login = $7', [user.login, user.email, user.admin, user.name, user.place, user.raiting, user.oldLogin], function (err, res) {
            if (err) {
                console.log('Ошибка во время обновления данных')
                return
            } 
            // res.status(200).json({
            //     status: 'ok'
            // })        
        })
    }



//     client.query('UPDATE users SET email = $1, password = $2, admin = $3, place = $4, avatar = $5, raiting = $6 WHERE login = $7;', [user.email, user.password, user.admin, user.place, user.avatar, user.raiting, user.login], function (err, result) {
//         if (err) {
//             console.log('Ошибка во время обновления')
//             return
//        }
//       // res.json(result.rows)
//    })

   res.status(200).json({
    status: 'ok'
}) 
}

exports.updatePassword = (req, res) => {
    const login = req.query.login
    //const oldPassword = req.oldPassword
    //console.log(req.oldPassword)

    const user = {
        login: login,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
    }

    console.log(user)

    //Проверка старого пароля с тем что в базе

    client.query('SELECT password AS password FROM users WHERE login = $1', [user.login], function (err, result) {
        if (err) {
            console.log('Ошибка')
            return
        }

        const passwordFromDB = result.rows[0].password
        console.log(user.login, user.oldPassword, passwordFromDB)
        bcrypt.compare(user.oldPassword, passwordFromDB)
        .then((result) => {
            console.log(result)
            if(result === true) {
                bcrypt.hash(user.newPassword, salt)
                .then((hash) => {
                    // Store hash in your password DB.
                    client.query('UPDATE users SET password = $1 WHERE login = $2', [hash, user.login], function (err, result) {
                        if (err) {
                            console.log('Ошибка обновения хешированного пароля')
                            return
                        }
                        result = {'status': 'ok'}
                        res.send(result)
                    })
                }); 
            } else {
                res.send({'status': 'error'})
            }
            // result == true
        });
    })
}

exports.deleteByLogin = (req, res) => {
    let login = req.params.login
    client.query('DELETE FROM users WHERE login = $1;', [login], function(err, result) {
        if(err) {
            console.log('Ошибка во время удаления')
            return
        }
        res.status(200).json({status: 'ok'})
    })
}

exports.deleteAll = (req, res) => {
    client.query('DELETE * FROM users;', [], function (err, result) {
        if (err) {
           return next(err)
       }
       result = 'Удалено'
       res.send(result)
   })
}