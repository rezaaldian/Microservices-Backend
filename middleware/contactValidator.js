const { check } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Nama Harus Diisi")
    .isLength({ min: 3 })
    .withMessage("Nama minimal 3 karakter")
    .trim()
    .escape(),
  check("email")
    .notEmpty()
    .withMessage("email Harus Diisi")
    .isEmail()
    .withMessage("email harus diisi"),
  check("phone")
    .notEmpty()
    .withMessage("phone Harus Diisi")
    .isMobilePhone("id-ID")
    .withMessage("format phone tidak valid"),
];
