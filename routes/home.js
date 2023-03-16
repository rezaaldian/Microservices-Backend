const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //   res.send("root page");
  res.render("index", {
    judul: "Halaman Index nih Bos",
    layout: "layouts/main-layout",
  });
});

router.get("/about", (req, res) => {
  //   res.json({
  //     msg: "About Page",
  //     nama: "Reza Aldian",
  //     job: "Fullstack dev",
  //     alamat: "Chicago street",
  //   });
  const pegawai = [
    {
      nama: "Reza Aldian",
      job: "CEO TESLA",
      phone: "089655546465",
    },
    {
      nama: "Steve Jobs",
      job: "Apple Corp",
      phone: "08211676575",
    },
    {
      nama: "Mark",
      job: "Pesbuk",
      phone: "083967857",
    },
  ];
  res.render("about", {
    layout: "layouts/main-layout",
    data: pegawai,
  });
});

router.get("/services", (req, res) => {
  //   res.sendFile("services.html", { root: "./views" });
  res.render("services", {
    judul: "Halaman Services",
    layout: "layouts/main-layout",
  });
});

//routing dengan parameter
router.get("/user/:id", (req, res) => {
  res.send(`User ID: ${req.params.id} \n email : ${req.query.email}`);
});

module.exports = router;
