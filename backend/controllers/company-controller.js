const client = require('../configs/db.js')
const fs = require('fs')
const nodemailer = require('nodemailer')


exports.create = (req, res) => {
    client.query('INSERT INTO companies (name, description, email, website, logo, gives_discounts) ' +
    'VALUES ($1, $2, $3, $4, $5, $6)',
    [
        req.body.name, 
        req.body.description, 
        req.body.email, 
        req.body.website, 
        'uploads/companies/' + req.file.filename,
        req.body.gives_discounts
    ])
    .then((result) => {
        res.status(200).json({status: 'success'})
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.readAll = (req, res) => {
    client.query('SELECT * FROM companies')
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}


exports.sendPartnershipRequest = (req, res) => {

    const message = {
        name: req.body.name,
        email: req.body.email,
        description: req.body.description
    }

    console.log(message)

    
    nodemailer.createTestAccount()
    .then((result) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'vsgofishing@gmail.com',
              pass: 'Aaa111!!!',
            },
        })

        transporter.sendMail({
            from: '"GoFishing!🐟" <nodejs@example.com>',
            to: 'victoriaskokan@gmail.com',
            subject: 'Message from Node js',
            text: 'This message was sent from Node js server.',
            html:
              'This <i>message</i> was sent from <strong>Node js</strong> server. <br/>' +
              `<div>ФИО: ${message.name}</div><div>Email: ${message.email}</div><div>Сопроводительный текст: ${message.description}</div>`,
          })
          .then((result) => {
              console.log(result)
              return transporter.sendMail({
                from: '"GoFishing!🐟" <nodejs@example.com>',
                to: `${message.email}`, // `victoriaskokan@gmail.com`, //${message.email}
                subject: 'Message from Node js',
                text: 'This message was sent from Node js server.',
                html:
                  'This <i>message</i> was sent from <strong>Node js</strong> server. <br/>' +
                  `<div>Ваша заявка по поводу <div>${message.description}</div> подана на рассмотрение!</div>`,
              })
          })
          .then((result) => {
            res.status(200).json({message: 'sent'})
          })
          .catch((err) => {
              console.log(err)
          })
    })

}

exports.readDepartments = (req, res) => {
    client.query('SELECT departments.id, departments.adress, departments.latitude, ' + 
    'departments.longitude, locations.name AS "location" FROM departments INNER JOIN locations ' +
    'ON locations.id = departments.location WHERE company = $1 GROUP BY departments.id, locations.name', [req.params.id])
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}