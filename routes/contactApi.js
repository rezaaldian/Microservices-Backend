const express = require("express");
const contactApiController = require("../controllers/contactApiController");
const contactValidator = require("../middleware/contactValidator");
const upload = require("../middleware/uploadValidator");
const router = express.Router();

//dari controller
router.get("/", contactApiController.index);
router.post("/", contactValidator, contactApiController.store);
router.get("/:id", contactApiController.show);
router.put("/:id", contactValidator, contactApiController.update);
router.put("/:id", contactValidator, contactApiController.update);
router.delete("/:id", contactApiController.destroy);

//untuk test upload
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Upload Sukses",
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      data: {
        error: error.message,
      },
    });
  }
});

module.exports = router;
