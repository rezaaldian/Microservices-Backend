const express = require("express");
const basicController = require("../controllers/basicController");
const router = express.Router();

//route untuk API
// router.get("/", (req, res) => {
//   res.status(200).json({
//     message: "api Berhasil Diakses",
//   });
// });

//dari controller
router.get("/", basicController.index);
router.post("/", basicController.basic);

module.exports = router;
