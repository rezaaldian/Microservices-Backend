const { validationResult } = require("express-validator");
const db = require("../database/models");
const fs = require("fs");
module.exports = {
  //get all data contact
  async index(req, res) {
    const contacts = await db.Contact.findAll({});
    return res.status(200).json({
      status: "success",
      data: contacts,
    });
  },
  //store
  async store(req, res) {
    // console.log(req.file);
    const errors = validationResult(req);
    const { name, email, phone } = req.body;
    const img = req.file;
    //logika jika ada file
    if (img) {
      var image = req.file.filename;
    } else {
      var image = null;
    }
    //logika jika error
    if (!errors.isEmpty()) {
      return res.status(422).json({ status: "error", errors: errors.array() });
    } else {
      const contact = await db.Contact.create({
        name: name,
        email: email,
        phone: phone,
        image: image,
      });
      return res.status(201).json({
        status: "data berhasil ditambahkan",
        data: contact,
      });
    }
  },

  //detail data
  async show(req, res) {
    const id = req.params.id;
    const contact = await db.Contact.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "email", "phone"],
    });
    //jika data gak ada
    if (!contact) {
      return res.status(404).json({ status: "data tidak ditemukan" });
    }
    return res.status(200).json({ data: contact });
  },

  //Update data
  async update(req, res) {
    const errors = validationResult(req);
    const id = req.params.id;
    const { name, email, phone } = req.body;

    //logika jika error
    if (!errors.isEmpty()) {
      return res.status(422).json({ status: "error", errors: errors.array() });
    } else {
      const contact = await db.Contact.findOne({ where: { id: id } });
      if (contact) {
        if (req.file) {
          if (contact.image !== null) {
            //cek ada data image di db atau tidak
            const target = `public/images/${contact.image}`;
            //hapus file image
            fs.unlinkSync(target);
          }
          var image = req.file.filename;
        } else {
          var image = contact.image;
        }
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
        contact.image = image;
        await contact.save();
        return res.status(201).json({ status: "berhasil update data" });
      } else {
        return res.status(404).json({ status: "data tidak ditemukan" });
      }
    }
  },

  //delete data
  async destroy(req, res) {
    const id = req.params.id;
    const contact = await db.Contact.findOne({
      where: {
        id: id,
      },
    });

    //jika data gak ada
    if (contact) {
      //image ada atau nggak
      if (contact.image !== null) {
        const target = `public/images/${contact.image}`;
        fs.unlinkSync(target);
      }
      await contact.destroy();
      return res.status(200).json({ status: "Data berhasil dihapus" });
    } else {
      return res.status(404).json({ status: "Data tidak ditemukan" });
    }
  },
};
