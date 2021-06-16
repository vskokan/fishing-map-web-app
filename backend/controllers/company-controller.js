const client = require("../configs/db.js");
const fs = require("fs");
const nodemailer = require("nodemailer");

exports.create = (req, res) => {
  client
    .query(
      "INSERT INTO companies (name, description, email, website, logo, " +
        "contract_plan, contract_term, contract_creation_date) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        req.body.name,
        req.body.description,
        req.body.email,
        req.body.website,
        "uploads/companies/" + req.file.filename,
        req.body.contractPlan,
        req.body.contractTerm,
        req.body.contractCreationDate,
      ]
    )
    .then((result) => {
      res.status(200).json({
        message: "Created",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.readAll = (req, res) => {
  client
    .query(
      'SELECT companies.id, companies.name AS "name", companies.logo, companies.website, ' +
        "companies.email, companies.description, " +
        "to_char(companies.contract_creation_date, 'DD.MM.YYYY') AS " +
        '"contractCreationDate" , ' +
        'companies.contract_creation_date AS "rawContractCreationDate", ' +
        'companies.contract_term AS "contractTerm", tariff_plans.id AS "contractPlanId", ' +
        'tariff_plans.name AS "contractPlanName", COUNT(departments.id) AS "departmentsAmount", ' +
        'extract (month from age(contract_creation_date)) < contract_term AS "isContractActive" ' +
        "FROM companies LEFT OUTER JOIN departments ON departments.company = companies.id " +
        "LEFT OUTER JOIN tariff_plans ON tariff_plans.id = companies.contract_plan " +
        "GROUP BY companies.id, companies.name, companies.logo, companies.website, " +
        "companies.email, companies.description, companies.contract_creation_date, " +
        "tariff_plans.id, tariff_plans.name ORDER BY companies.name"
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.delete = (req, res) => {
  console.log(req.params.id);
  client
    .query("DELETE FROM companies WHERE id = $1", [req.params.id])
    .then((result) => {
      res.status(200).json({
        message: "Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.update = (req, res) => {
  const company = {
    id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    website: req.body.website,
    description: req.body.description,
    contractPlan: req.body.contractPlan,
    contractTerm: req.body.contractTerm,
    contractCreationDate: req.body.contractCreationDate,
  };

  if (req.file !== undefined) {
    company.logo = "uploads/companies/" + req.file.filename;
    client
      .query("SELECT logo FROM companies WHERE id = $1", [company.id])
      .then((result) => {
        fs.unlinkSync(result.rows[0].logo);
        client
          .query(
            "UPDATE companies SET name = $1, email = $2, website = $3, " +
              "description = $4, contract_plan = $5, contract_term = $6, logo = $7, " +
              "contract_creation_date = $8 WHERE id = $9",
            [
              company.name,
              company.email,
              company.website,
              company.description,
              company.contractPlan,
              company.contractTerm,
              company.logo,
              company.contractCreationDate,
              company.id,
            ]
          )
          .then((result) => {
            res.status(200).json({
              message: "Updated",
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
    client
      .query(
        "UPDATE companies SET name = $1, email = $2, website = $3, " +
          "description = $4, contract_plan = $5, contract_term = $6, " +
          "contract_creation_date = $7 WHERE id = $8",
        [
          company.name,
          company.email,
          company.website,
          company.description,
          company.contractPlan,
          company.contractTerm,
          company.contractCreationDate,
          company.id,
        ]
      )
      .then((result) => {
        res.status(200).json({
          message: "Updated",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.sendPartnershipRequest = (req, res) => {
  const message = {
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
  };

  console.log(message);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vsgofishing@gmail.com",
      pass: "Aaa111!!!",
    },
  });

  transporter
    .sendMail({
      from: '"GoFishing!🐟"',
      to: "victoriaskokan@gmail.com",
      subject: "Message from Node js",
      text: "This message was sent from Node js server.",
      html:
        "This <i>message</i> was sent from <strong>Node js</strong> server. <br/>" +
        `<div>ФИО: ${message.name}</div><div>Email: ${message.email}</div>`+
        `<div>Сопроводительный текст: ${message.description}</div>`,
    })
    .then((result) => {
      console.log(result);
      return transporter.sendMail({
        from: '"GoFishing!🐟"',
        to: `${message.email}`,
        subject: "Message from Node js",
        text: "This message was sent from Node js server.",
        html:
          "This <i>message</i> was sent from <strong>Node js</strong> server. <br/>" +
          `<div>Ваша заявка по поводу <div>${message.description}</div> подана на рассмотрение!</div>`,
      });
    })
    .then((result) => {
      res.status(200).json({
        message: "sent",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.readDepartments = (req, res) => {
  client
    .query(
      "SELECT departments.id, departments.adress, departments.latitude, " +
        'departments.longitude, locations.name AS "location" FROM departments INNER JOIN locations ' +
        "ON locations.id = departments.location WHERE company = $1 GROUP BY departments.id, locations.name",
      [req.params.id]
    )
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};
