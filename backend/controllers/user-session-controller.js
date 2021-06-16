const client = require('../configs/db.js')

exports.readUserSessions = (req, res) => {
    console.log(req.params.login)
    client.query('SELECT id, login, user_agent AS "userAgent", ip FROM sessions WHERE login = $1', [req.params.login])
        .then((result) => {
            res.status(200).json(result.rows)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.deleteUserSession = (req, res) => {
    let needToLogout = false
    console.log(req.params.sessionId)
    if (req.params.sessionId != 'undefined') {
        client.query('BEGIN')
        .then(() => {
                return client.query('SELECT refresh_token AS "refreshToken" FROM sessions WHERE id = $1', [req.params.sessionId])
        })
        .then((result) => {
            if (result.rows[0].refreshToken == req.cookies.refreshToken) {
                needToLogout = true
                console.log('NEED TO LOGOUT')
            }

            return client.query('DELETE FROM sessions WHERE id = $1', [req.params.sessionId])
        })
        .then((result) => {
            return client.query('COMMIT')
        })
         .then((result) => {
                res.status(200).json(needToLogout)
        })
        .catch((err) => {
            console.log(err)
            return client.query('ROLLBACK')
        })
        .catch((err) => {
            console.log('Rollback error')
            console.log(err)
        })

    } else {
        console.log('full loogut')
        client.query('DELETE FROM sessions WHERE login = $1', [req.params.login])
        .then((result) => {
            console.log('NEED TO LOGOUT')
            res.status(200).json(needToLogout)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}