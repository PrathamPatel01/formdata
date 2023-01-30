const { check } = require("express-validator");

module.exports = {
  requireUsername: check("username")
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage("Not a Valid Username"),
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid Email"),
  requireContact: check("contact")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Not a Valid Contact"),
  requireComments: check("comments").trim().isLength({ max: 200 }),
};
