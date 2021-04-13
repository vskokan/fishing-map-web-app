/*
1. Определить, может ли пользователь получить скидку -> в отзыв
2. Выбрать подходящие компании
3. Сгенерировать скикдку
 */

exports.checkUserDiscounts = (req, res) => {
    console.log(req.body.login)

    res.status(200).json({message: 'discount middleware test'})
}