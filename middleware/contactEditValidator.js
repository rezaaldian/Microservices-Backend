const { check } = require("express-validator");

module.exports = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Nama minimal 3 karakter")
    .isString()
    .withMessage("Nama Harus Berupa string"),
  check("email").isEmail().withMessage("email harus diisi"),
  check("phone").isMobilePhone("id-ID").withMessage("format phone tidak valid"),
];
