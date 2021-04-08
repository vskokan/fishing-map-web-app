const client = require('../configs/db.js')

exports.readUserSessions = (req, res) => {
    console.log(req.params.login)
    client.query('SELECT id, login, user_agent, ip FROM sessions WHERE login = $1', [req.params.login])
    .then((result) => {
        res.status(200).json(result.rows)
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.deleteUserSession = (req, res) => {
    let filter = (req.params.sessionId == undefined) ? '' : ` AND id = ${req.params.sessionId}`
    client.query('DELETE FROM sessions WHERE login = $1'+filter, [req.params.login])
    .then((result) => {
        res.status(200).json({message: 'session/s ended'})
    })
    .catch((err) => {
        console.log(err)
    })
}