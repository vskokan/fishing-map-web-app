const client = require("../configs/db.js");
const { AwesomeQR } = require("awesome-qr");
const fs = require("fs");

const discountGenerationValue = 300;

exports.checkUserDiscounts = (req, res, next) => {
  client
    .query(
      "SELECT users.login, COUNT(reviews.id) * 100 + CASE WHEN " +
        "SUM(review_stats.vote) IS NULL THEN 0 ELSE  SUM(review_stats.vote) END AS rating, " +
        "temp.count FROM users LEFT OUTER JOIN reviews " +
        "ON reviews.login = users.login LEFT OUTER JOIN review_stats " +
        "ON review_stats.review = reviews.id LEFT OUTER JOIN (SELECT discounts.login, " +
        "COUNT(discounts.is_valid) AS count FROM discounts " +
        "GROUP BY discounts.login) AS temp ON temp.login = users.login " +
        "WHERE users.login = $1 GROUP BY users.login, temp.count",
      [req.body.login]
    )
    .then((result) => {
      if (
        Math.trunc(result.rows[0].rating / discountGenerationValue) >=
        +result.rows[0].count + 1
      ) {
        next();
      } else {
        res.status(200).json({
          message: "low rating",
        });
      }
    });
};

exports.generateDiscount = (req, res) => {
  client
    .query(
      "SELECT users.login, users.location, array_agg(DISTINCT departments.company) " +
        "AS companies FROM users LEFT OUTER JOIN departments ON departments.location = users.location " +
        "WHERE users.login = $1 GROUP BY users.login",
      [req.body.login]
    )
    .then((result) => {
      if (result.rows[0].companies[0] !== null) {
        const company =
          result.rows[0].companies[
            getRandomInt(0, result.rows[0].companies.length)
          ];
        const discountValue = getRandomInt(5, 51);

        client
          .query(
            "INSERT INTO discounts(company, value, login, is_valid) " +
              "VALUES($1, $2, $3, $4) returning id",
            [company, discountValue, req.body.login, true]
          )
          .then((result) => {
            const background = fs.readFileSync(
              "uploads/discounts/background.png"
            );
            const qrName = result.rows[0].id;
            new AwesomeQR({
              text: `${qrName}`,
              size: 500,
              backgroundImage: background,
              dotScale: 0.35,
              autoColor: false,
              colorDark: "#39004d",
            })
              .draw()
              .then((result) => {
                fs.writeFileSync(`uploads/discounts/${qrName}.png`, result);
                return client.query(
                  "UPDATE discounts SET qr = $1 WHERE id = $2",
                  [`uploads/discounts/${qrName}`, qrName]
                );
              })
              .then((result) => {
                res.status(200).json({
                  message: "Generated",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.status(200).json({
          message: "No avaliable companies",
        });
      }
    });
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.getUserDiscounts = (req, res) => {
  console.log(req.params.login)
  client.query('SELECT discounts.id, discounts.value, discounts.qr, discounts.is_valid, ' +
  'companies.name, companies.logo FROM discounts INNER JOIN companies ON ' + 
  'companies.id = discounts.company WHERE discounts.login = $1',
  [req.params.login])
  .then((result) => {
    res.status(200).json(result.rows)
  })
  .catch((err) => {
    console.log(err)
  })
}