const { validationResult } = require("express-validator");
const db = require("../database/models");
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
    const errors = validationResult(req);
    const { name, email, phone } = req.body;

    //logika jika error
    if (!errors.isEmpty()) {
      return res.status(422).json({ status: "error", errors: errors.array() });
    } else {
      const contact = await db.Contact.create({
        name: name,
        email: email,
        phone: phone,
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
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
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
      await contact.destroy();
      return res.status(200).json({ status: "Data berhasil dihapus" });
    } else {
      return res.status(404).json({ status: "Data tidak ditemukan" });
    }
  },
};
