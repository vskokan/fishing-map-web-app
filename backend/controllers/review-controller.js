const client = require("../configs/db.js");
const fs = require("fs");
const format = require("pg-format");

exports.create = (req, res, next) => {
  const review = {
    login: req.body.login,
    description: req.body.description,
    baiting: req.body.baiting,
    road: req.body.road == "undefined" ? null : req.body.road,
    time: req.body.time == "undefined" ? null : req.body.time,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    facts: transformFacts(JSON.parse(req.body.facts)),
    photos: req.files,
  };

  client
    .query("BEGIN")
    .then((result) => {
      return client.query(
        "INSERT INTO reviews (login, date, description, baiting, road, " +
          "time, latitude, longitude) VALUES ($1, current_date, $2, $3, $4, " +
          "$5, $6, $7) returning id",
        [
          review.login,
          review.description,
          review.baiting,
          review.road,
          review.time,
          review.latitude,
          review.longitude,
        ]
      );
    })
    .then((result) => {
      const reviewId = result.rows[0].id;
      console.log(reviewId);

      review.facts.forEach((fact) => {
        fact.unshift(reviewId);
      });
      return client.query(
        format(
          "INSERT INTO facts (review, method, bait, fish) " +
            "VALUES %L returning review",
          review.facts
        )
      );
    })
    .then((result) => {
      const reviewId = result.rows[0].review;
      if (req.files.length !== 0) {
        const values = [];
        req.files.forEach((file) => {
          values.push([
            reviewId,
            `uploads/reviews/${review.login}/` + file.filename,
          ]);
        });

        return client.query(
          format("INSERT INTO review_photos (review, src) VALUES %L", values)
        );
      }
    })
    .then((result) => {
      return client.query("COMMIT");
    })
    .then((result) => {
      console.log("Транзакция проведена");
      next();
    })
    .catch((err) => {
      console.log("Ошибка в транзакции, откат: ", err);
      return client.query("ROLLBACK");
    })
    .catch((err) => {
      console.log("Ошибка во время отката: ", err);
    });
};

function transformFacts(facts) {
  let transformedFacts = [];

  facts.forEach((fact) => {
    fact.fishes.forEach((fish) => {
      transformedFacts.push([fact.method.id, fact.bait.id, fish.id]);
    });
  });

  return transformedFacts;
}



exports.getPhotos = (req, res) => {
  const id = req.params.id;

  client
    .query("SELECT * FROM review_photos WHERE review = $1", [id])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOptions = (req, res) => {
  const options = {
    baiting: [],
    time: [],
    road: [],
  };
  client
    .query("BEGIN")
    .then(() => {
      return client.query("SELECT * FROM baiting");
    })
    .then((result) => {
      options.baiting = result.rows;
      return client.query("SELECT * FROM time");
    })
    .then((result) => {
      options.time = result.rows;
      return client.query("SELECT * FROM road");
    })
    .then((result) => {
      options.road = result.rows;
      return client.query("COMMIT");
    })
    .then((result) => {
      res.status(200).json(options);
    })
    .catch((err) => {
      console.log(err);
      return client.query("ROLLBACK");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.delete = (req, res) => {
  client
    .query("BEGIN")
    .then(() => {
      return client.query("SELECT src FROM review_photos WHERE review = $1", [
        req.params.id,
      ]);
    })
    .then((result) => {
      result.rows.forEach((row) => {
        fs.unlinkSync(row.src);
      });
      return client.query("DELETE FROM reviews WHERE id = $1", [req.params.id]);
    })
    .then((result) => {
      return client.query("COMMIT");
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted" });
    })
    .catch((err) => {
      console.log(err);
      return client.query("ROLLBACK");
    });
};

exports.getFull = (req, res) => {
  const review = {
    baseInfo: {},
    facts: [],
    photos: [],
    rating: "",
    reports: "",
  };

  client
    .query("BEGIN")
    .then(() => {
      return client.query(
        "SELECT users.login, users.avatar, to_char(date, 'DD.MM.YYYY') AS date, " +
          'reviews.description, baiting.id AS "baitingId", baiting.description AS ' +
          '"baitingDescription", road.id AS "roadId", road.description AS ' +
          '"roadDescription", time.id AS "timeId", time.description AS ' +
          '"timeDescription", latitude, longitude FROM reviews ' +
          "INNER JOIN baiting ON baiting.id = reviews.baiting " +
          "LEFT OUTER JOIN road ON road.id = reviews.road LEFT OUTER JOIN " +
          "time ON time.id = reviews.time INNER JOIN users ON users.login " +
          " = reviews.login WHERE reviews.id = $1",
        [req.params.id]
      );
    })
    .then((result) => {
      review.baseInfo = result.rows[0];
      return client.query(
        "SELECT facts.id AS fact, " +
          'fishes.id AS "fishId", fishes.name AS "fishName", ' +
          'baits.id AS "baitId", baits.name AS "baitName", baits.description AS "baitDescription", ' +
          'methods.id AS "methodId", methods.name AS "methodName", methods.description AS "methodDescription" ' +
          "FROM facts INNER JOIN reviews ON reviews.id = facts.review INNER JOIN fishes ON fishes.id = facts.fish " +
          "INNER JOIN baits ON baits.id = facts.bait INNER JOIN methods ON methods.id = facts.method WHERE review = $1;",
        [req.params.id]
      );
    })
    .then((result) => {
      review.facts = formatFacts(result.rows);
      return client.query(
        "SELECT id, src FROM review_photos WHERE review = $1",
        [req.params.id]
      );
    })
    .then((result) => {
      review.photos = result.rows;
      return client.query(
        "SELECT SUM(vote) AS rating FROM review_stats WHERE review = $1 GROUP BY review",
        [req.params.id]
      );
    })
    .then((result) => {
      review.rating = result.rows.length == 0 ? 0 : result.rows[0].rating;
      return client.query(
        "SELECT COUNT(*) AS reports FROM review_stats WHERE review = $1 AND report = true",
        [req.params.id]
      );
    })
    .then((result) => {
      review.reports = result.rows.length == 0 ? 0 : result.rows[0].reports;
      return client.query(
        "SELECT COUNT(reviews.id) AS amount FROM reviews WHERE reviews.login = $1",
        [review.baseInfo.login]
      );
    })
    .then((result) => {
      review.baseInfo.userRating = result.rows[0].amount * 100;
      console.log(review.baseInfo.userRating);
      return client.query(
        "SELECT SUM(review_stats.vote) AS sum FROM review_stats INNER JOIN " +
          "reviews ON reviews.id = review_stats.review WHERE reviews.login = $1",
        [review.baseInfo.login]
      );
    })
    .then((result) => {
      review.baseInfo.userRating += +result.rows[0].sum;
      console.log(review.baseInfo.userRating);
      return client.query("COMMIT");
    })
    .then((result) => {
      res.status(200).json({ review: review });
    })
    .catch((err) => {
      console.log(err);
      return client.query("ROLLBACK");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAll = (req, res) => {
  const user = req.query.user;
  let queryString = "";
  if (user !== undefined) {
    queryString += `WHERE reviews.login = '${user}' `;
  }

  client
    .query(
      "SELECT reviews.id, reviews.login, to_char(date, 'DD.MM.YYYY') AS date, " +
        'SUM(review_stats.vote), SUM(review_stats.vote) AS "reviewRating", ' +
        "COUNT(review_photos.src) AS photos, " +
        "SUM(case review_stats.report when 'true' then 1 else 0 end) AS reports, " +
        "array_agg(DISTINCT facts.fish) AS fishes, " +
        'reviews.description, baiting.id AS "baitingId", baiting.description AS ' +
        '"baitingDescription", road.id AS "roadId", road.description AS ' +
        '"roadDescription", time.id AS "timeId", time.description AS "timeDescription", ' +
        "latitude, longitude FROM reviews INNER JOIN baiting ON baiting.id = reviews.baiting " +
        "LEFT OUTER JOIN road ON road.id = reviews.road LEFT OUTER JOIN time ON time.id " +
        "= reviews.time LEFT OUTER JOIN review_stats ON review_stats.review = reviews.id " +
        "LEFT OUTER JOIN review_photos ON review_photos.review = reviews.id " +
        "INNER JOIN facts ON facts.review = reviews.id " +
        queryString +
        " GROUP BY reviews.id, baiting.id, road.id, time.id, review_stats.report"
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

function formatFacts(facts) {
  const formatedFacts = [];
  let fishes = [];
  const combinations = formCombinations(facts);

  combinations.forEach((combination) => {
    facts.forEach((fact) => {
      if (
        fact.baitId == combination.bait.id &&
        fact.methodId == combination.method.id
      ) {
        fishes.push({
          id: fact.fishId,
          name: fact.fishName,
        });
      }
    });
    console.log(combination);
    console.log(fishes);
    formatedFacts.push({
      combination: combination,
      fishes: fishes,
    });

    fishes = [];
  });

  return formatedFacts;
}

function formCombinations(facts) {
  const combinations = [];

  facts.forEach((fact) => {
    combinations.push({
      bait: {
        id: fact.baitId,
        name: fact.baitName,
        description: fact.baitDescription,
      },
      method: {
        id: fact.methodId,
        name: fact.methodName,
        description: fact.methodDescription,
      },
    });
  });

  return reduceArrayOfObjects(combinations);
}

function reduceArrayOfObjects(array) {
  let reducedArray = [];

  if (array.length == 1) {
    reducedArray = array;
  } else {
    for (let i = 0; i < array.length; i++) {
      let isExist = false;

      for (let j = 0; j < reducedArray.length; j++) {
        if (
          array[i].bait.id == reducedArray[j].bait.id &&
          array[i].method.id == reducedArray[j].method.id
        )
          isExist = true;
      }

      if (!isExist) {
        reducedArray.push(array[i]);
      }
    }
  }

  return reducedArray;
}

exports.changeStats = (req, res) => {
   
    console.log(req.body)
  client
    .query("BEGIN")
    .then(() => {
      return client.query(
        "SELECT * from review_stats WHERE review = $1 AND login = $2",
        [req.params.id, req.body.login]
      );
    })
    .then((result) => {
    console.log(result.rows.length)
      if (result.rows.length === 1) {
        if (req.body.type === "vote") {
          if (result.rows[0].vote == 0 - req.body.value) {
            
            return client.query(
              "UPDATE review_stats SET vote = 0 " +
                "WHERE review = $1 AND login = $2",
              [req.params.id, req.body.login]
            );
          } else if (result.rows[0].vote !== req.body.value) {
            return client.query(
                "UPDATE review_stats SET vote = $1 " +
                  "WHERE review = $2 AND login = $3",
                [req.body.value, req.params.id, req.body.login]
              );
          }
        } else if (req.body.type === "report") {
            console.log(!result.rows[0].report)
            console.log(req.body.login)
            return client.query(
              "UPDATE review_stats SET report = $1 " +
                "WHERE review = $2 AND login = $3",
              [!result.rows[0].report, req.params.id, req.body.login]
            );
        }
      } else if (result.rows.length === 0) {
        if (req.body.type == "vote") {
          return client.query(
            "INSERT INTO review_stats (review, login, report, vote) " +
              "VALUES ($1, $2, $3, $4)",
            [req.params.id, req.body.login, false, req.body.value]
          );
        } else if (req.body.type === "report") {
          return client.query(
            "INSERT INTO review_stats (review, login, report, vote) " +
              "VALUES ($1, $2, $3, $4)",
            [req.params.id, req.body.login, true, 0]
          );
        }
      }
    })
    .then((result) => {
        return client.query('COMMIT')
    })
    .then((result) => {
        res.status(200).json({message: 'Changed'})
    })
    .catch((err) => {
        console.log(err)
        return client.query('ROLLBACK')
    })
};
