const client = require('../configs/db.js')

exports.create = (req, res) => {
    client.query('INSERT INTO tariff_plans (name, description, price, discount_support) VALUES ($1, $2, $3, $4)',
    [req.body.name, req.body.description, req.body.price, req.body.discountSupport])
    .then((result) => {
        res.status(200).json({message: 'inserted'})
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.read = (req, res) => {
    client.query('SELECT id, name, description, price, discount_support AS "discountSupport" FROM tariff_plans ORDER BY price')
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.update = (req, res) => {
    client.query('UPDATE tariff_plans SET name = $1, description = $2, price = $3 WHERE id = $4',
    [req.body.name, req.body.description, req.body.price, req.params.id])
    .then((result) => {
        res.status(200).json({message: 'updated'})
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.delete = (req, res) => {
    client.query('DELETE FROM tariff_plans WHERE id = $1', [req.params.id])
    .then((result) => {
        res.status(200).json({message: 'deleted'})
    })
}