const client = require("../configs/db.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const user = {
    login: req.body.login,
    password: req.body.password,
    ip: req.ip,
    userAgent: req.body.userAgent,
  };
  client
    .query(
      "SELECT login, password AS hash, admin, email, location, avatar, raiting, name, ban from users WHERE login = $1",
      [user.login]
    )
    .then((result) => {
      const hash = result.rows[0].hash;
      const currentUser = result.rows[0];
      bcrypt.compare(user.password, hash).then((result) => {
        if (result === true) {
          const accessToken = jwt.sign(
            {
              data: {
                login: user.login,
                userAgent: user.userAgent,
              },
              exp: Math.floor(Date.now() / 1000) + 30 * 1,
            },
            "secret"
          );

          const refreshToken = jwt.sign(
            {
              data: {
                login: user.login,
                userAgent: user.userAgent,
                created: Date.now(),
              },
            },
            "secret"
          );

          client
            .query(
              "INSERT INTO sessions (login, ip, user_agent, refresh_token) VALUES ($1, $2, $3, $4)",
              [user.login, user.ip, user.userAgent, refreshToken]
            )
            .then((result) => {
              result = {
                user: currentUser,
                accessToken: accessToken,
                refreshToken: refreshToken,
              };
              return result;
            })
            .then((result) => {
              res
                .status(200)
                .cookie("accessToken", `${result.accessToken}`, {
                  maxAge: 8640000000000,
                  httpOnly: true,
                })
                .cookie("refreshToken", `${result.refreshToken}`, {
                  maxAge: 8640000000000,
                  httpOnly: true,
                })
                .json({ user: result.user });
            });
        } else {
          console.log("Пароль неправильный!");
          res.status(500).json({ error: "Ошибка пароля" });
        }
      });
    });
};



exports.logout = (req, res) => {
  console.log(req.headers);
  client
    .query("DELETE FROM sessions WHERE refresh_token = $1", [
      req.cookies.refreshToken,
    ])
    .then((result) => {
      console.log("Сессия удалена успешно");
      res.clearCookie("accessToken").clearCookie("refreshToken");
      res.status(200).json({ message: "logout" });
    })
    .catch((err) => {
      console.log(err);
    });
};

function generateTokens(login, userAgent) {
  const accessToken = jwt.sign(
    {
      data: {
        login: login,
        userAgent: userAgent,
      },
      exp: Math.floor(Date.now() / 1000) + 60 * 1,
    },
    "secret"
  );

  const refreshToken = jwt.sign(
    {
      data: {
        login: login,
        userAgent: userAgent,
        created: Date.now(),
      },
    },
    "secret"
  );

  return { accessToken: accessToken, refreshToken: refreshToken };
}

exports.verify = (req, res, next) => {
  console.log(req.headers);

  let tokensAreExistButNotInDatabase = false;

  if (
    req.cookies.accessToken === undefined ||
    req.cookies.refreshToken === undefined
  ) {
    res.status(404).json({ message: "No cookies" });
  }

  client
    .query("SELECT COUNT(*) AS count FROM sessions WHERE refresh_token = $1", [
      req.cookies.refreshToken,
    ])
    .then((result) => {
      console.log(result.rows);
      if (result.rows[0].count == 0) {
        console.log("Токены есть на устройстве, а в базе их нет ...");
        tokensAreExistButNotInDatabase = true;
        res
          .clearCookie("accessToken")
          .clearCookie("refreshToken")
          .status(200)
          .json({ message: "logout" });
      }
    });

  const auth = {
    accessToken: req.cookies.accessToken,
    refreshToken: req.cookies.refreshToken,
    message: req.body.message,
  };

  if (!tokensAreExistButNotInDatabase)
    jwt.verify(auth.accessToken, "secret", (err, decoded) => {
      if (err) {
        if (err.message == "jwt expired") {
          console.log("Токен доступа устарел"); 

          const decodedToken = jwt.decode(auth.accessToken);
          const user = {
            login: decodedToken.data.login,
            userAgent: decodedToken.data.userAgent,
            ip: req.ip,
          };

          client
            .query(
              "SELECT refresh_token AS token FROM sessions WHERE login = $1 AND user_agent = $2 AND ip = $3",
              [user.login, user.userAgent, user.ip]
            )
            .then((result) => {
              const isRefreshValid =
                jwt.decode(auth.refreshToken).data.created ===
                jwt.decode(result.rows[0].token).data.created;
              if (!isRefreshValid) {
                client
                  .query(
                    "DELETE FROM sessions WHERE login = $1 AND user_agent = $2 AND ip = $3",
                    [user.login, user.userAgent, user.ip]
                  )
                  .then(() => {
                    res.status(403).json({ message: "Токены не совпадают" }); 
                  })
                  .catch((err) => {
                    console.log("Что-то пошло не так при удалении сессии");
                  });
              } else {
                const tokens = generateTokens(user.login, user.userAgent);
                client
                  .query(
                    "UPDATE sessions SET refresh_token = $1 WHERE login = $2 AND ip = $3 AND user_agent = $4",
                    [tokens.refreshToken, user.login, user.ip, user.userAgent]
                  )
                  .then((result) => {
                    console.log(
                      "Токены обновлены и передаются куками в след. обработчик"
                    );
                    res
                      .cookie("accessToken", `${tokens.accessToken}`, {
                        maxAge: 8640000000000,
                        httpOnly: true,
                      })
                      .cookie("refreshToken", `${tokens.refreshToken}`, {
                        maxAge: 8640000000000,
                        httpOnly: true,
                      });
                    if (auth.message === undefined) {
                      next();
                    } else if (auth.message === "check session") {
                      client
                        .query("SELECT * FROM users WHERE login = $1", [
                          user.login,
                        ])
                        .then((result) => {
                          res.status(200).json({ user: result.rows[0] });
                        })
                        .catch((err) => {
                          console.log("Ошибка: ", err);
                        });
                    }
                  })
                  .catch((err) => {
                    console.log("Ошибка обновления токена: ", err);
                    res
                      .status(500)
                      .json({
                        message: "Ошибка сервера при обновлении токенов",
                      });
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        console.log("Токен доступа нормальный, декодированно: ", decoded);
        if (auth.message === undefined) {
          next();
        } else if (auth.message === "check session") {
          client
            .query("SELECT * from users WHERE login = $1", [decoded.data.login])
            .then((result) => {
              res.status(200).json({ user: result.rows[0] });
            })
            .catch((err) => {
              console.log("Ошибка: ", err);
            });
        } else {
          console.log("Неправильно передан параметр");
        }
      }
    });
};

exports.register = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const user = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
  };
  user.hashedPassword = bcrypt.hashSync(req.body.password, salt);

  client
    .query(
      "INSERT INTO users (login, email, password, avatar, name, " +
      "location, admin, ban, raiting) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        user.login,
        user.email,
        user.hashedPassword,
        "uploads/users/default.jpeg",
        "Не указано",
        1,
        0,
        0,
        0,
      ]
    )
    .then((result) => {
      res.status(200).json({ message: "Registered" });
    })
    .catch((err) => {
      console.log(err);
    });
};


