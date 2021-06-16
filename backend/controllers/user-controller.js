const client = require("../configs/db.js");
const bcrypt = require("bcrypt");
const fs = require("fs");
const salt = bcrypt.genSaltSync(10);

exports.create = (req, res) => {
  const user = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
    admin: 0,
    name: "Не указано",
    location: null,
    avatar: "uploads/users/default.jpeg",
    ban: 0,
    raiting: 0,
  };

  user.hashedPassword = bcrypt.hashSync(user.password, salt);

  client.query(
    "INSERT INTO users (login, email, password, admin, name, location, avatar, ban, raiting) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
    [
      user.login,
      user.email,
      user.hashedPassword,
      user.admin,
      user.name,
      user.place,
      user.avatar,
      user.raiting,
    ],
    function (err, result) {
      if (err) {
        return next(err);
      }
      res.send(result);
    }
  );
};

exports.readAll = (req, res) => {
  client
    .query(
      "SELECT users.*, COUNT(reviews.login) FROM users LEFT OUTER JOIN reviews ON reviews.login = users.login GROUP by users.login ORDER BY count DESC;",
      []
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.readOne = (req, res) => {
  console.log("USER READ ONE");
  let user = {
    login: req.params.login,
    name: "",
    avatar: "",
    location: "",
    email: "",
    admin: "",
    ban: "",
    rating: "",
    reviewsAmount: "",
  };

  client
    .query("BEGIN")
    .then(() => {
      return client.query(
        "SELECT login, users.name, avatar, locations.name AS location, email, admin, ban " +
          "FROM users INNER JOIN locations ON locations.id = users.location WHERE login = $1",
        [user.login]
      );
    })
    .then((result) => {
      user.name = result.rows[0].name;
      user.avatar = result.rows[0].avatar;
      user.location = result.rows[0].location;
      user.email = result.rows[0].email;
      user.admin = result.rows[0].admin;
      user.ban = result.rows[0].ban;

      return client.query(
        "SELECT COUNT(reviews.id) AS amount FROM reviews WHERE reviews.login = $1",
        [user.login]
      );
    })
    .then((result) => {
      user.reviewsAmount = result.rows[0].amount;
      return client.query(
        "SELECT SUM(review_stats.vote) AS sum FROM review_stats INNER JOIN " +
          "reviews ON reviews.id = review_stats.review WHERE reviews.login = $1",
        [user.login]
      );
    })
    .then((result) => {
      user.rating = user.reviewsAmount * 100 + +result.rows[0].sum;
      console.log(user);
      return client.query("COMMIT");
    })
    .then((result) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.update = (req, res) => {
  const user = {
    login: req.params.login,
    email: req.body.email,
    admin: req.body.admin,
    name: req.body.name,
    location: req.body.location,
  };

  console.log(req.file);
  if (req.file !== undefined) {
    user.avatar = "uploads/users/" + req.file.filename;

    client.query(
      "SELECT avatar AS avatar FROM users WHERE login = $1",
      [user.login],
      function (err, result) {
        if (err) {
          console.log("Ошибка во время поиска ссылки на изображение");
          res.json({ status: "error" });
        }
        console.log(result);
        const oldLink = result.rows[0].avatar;
        if (oldLink !== "uploads/users/default.jpeg") {
          fs.unlinkSync(oldLink);
        }

        client.query(
          "UPDATE users SET email = $1, admin = $2, name = $3, location = $4, avatar = $5 WHERE login = $6",
          [
            user.email,
            user.admin,
            user.name,
            user.location,
            user.avatar,
            user.login,
          ],
          function (err, res) {
            if (err) {
              console.log("Ошибка во время обновления данных");
              return;
            }
          }
        );
      }
    );
  } else {
    client.query(
      "UPDATE users SET email = $1, admin = $2, name = $3, location = $4 WHERE login = $5",
      [user.email, user.admin, user.name, user.location, user.login],
      function (err, res) {
        if (err) {
          console.log("Ошибка во время обновления данных");
          return;
        }
      }
    );
  }


  res.status(200).json({
    status: "ok",
  });
};

exports.updatePasswordOld = (req, res) => {
  const login = req.query.login;

  const user = {
    login: login,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
  };


  client.query(
    "SELECT password AS password FROM users WHERE login = $1",
    [user.login],
    function (err, result) {
      if (err) {
        console.log("Ошибка");
        return;
      }

      const passwordFromDB = result.rows[0].password;
      console.log(user.login, user.oldPassword, passwordFromDB);
      bcrypt.compare(user.oldPassword, passwordFromDB).then((result) => {
        console.log(result);
        if (result === true) {
          bcrypt.hash(user.newPassword, salt).then((hash) => {
            client.query(
              "UPDATE users SET password = $1 WHERE login = $2",
              [hash, user.login],
              function (err, result) {
                if (err) {
                  console.log("Ошибка обновения хешированного пароля");
                  return;
                }
                result = { status: "ok" };
                res.send(result);
              }
            );
          });
        } else {
          res.send({ status: "error" });
        }
      });
    }
  );
};

exports.updatePassword = (req, res) => {
  const user = {
    login: req.query.login,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
  };

  console.log(user);

  client
    .query("SELECT password AS password FROM users WHERE login = $1", [
      user.login,
    ])
    .then((result) => {
      if (result.rows[0].password.length == 0) {
        res.status(200).json({ message: "No password" });
      } else {
        const passwordFromDB = result.rows[0].password;
        bcrypt
          .compare(user.oldPassword, passwordFromDB)
          .then((result) => {
            if (result === true) {
              bcrypt.hash(user.newPassword, salt).then((hash) => {
                client
                  .query("UPDATE users SET password = $1 WHERE login = $2", [
                    hash,
                    user.login,
                  ])
                  .then((result) => {
                    res.status(200).json({ message: "password updated" });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            } else {
              res.status(200).json({ message: "wrong password" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteByLogin = (req, res) => {
  let login = req.params.login;
  client.query(
    "DELETE FROM users WHERE login = $1;",
    [login],
    function (err, result) {
      if (err) {
        console.log("Ошибка во время удаления");
        return;
      }
      res.status(200).json({ status: "ok" });
    }
  );
};

exports.deleteAll = (req, res) => {
  client.query("DELETE * FROM users;", [], function (err, result) {
    if (err) {
      return next(err);
    }
    result = "Удалено";
    res.send(result);
  });
};

exports.ban = (req, res) => {
  client
    .query("UPDATE users SET ban = $1 WHERE login = $2", [
      req.body.ban,
      req.params.login,
    ])
    .then((result) => {
      res.status(200).json({ message: "Ok" });
    })
    .catch((err) => {
      console.log(err);
    });
};
