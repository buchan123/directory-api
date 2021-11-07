const express = require("express");
const User = require("../models/user-model");
const verifyToken = require("../middlewares/verifyJWT");

const router = express.Router();

// Middlewares
// Parse JSON bodies (as sent by API clients)
router.use(express.urlencoded());
router.use(express.json());
// Authentication middleware
router.use(verifyToken);

router.get("/fetch-contacts", async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.status(200).json(user.contacts);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/add-contact", async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.user;
    const user = await User.findById(id);
    if (!(payload.firstName && payload.lastName)) {
      return res
        .status(400)
        .json({ message: "First Name or Last Name missing." });
    }

    user.contacts.push({
      ...payload,
    });
    user.save((err) => {
      if (err) return res.status(400).json({ message: err });
    });
    res.status(200).json(user.contacts[user.contacts.length - 1]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/contact/:contactId", (req, res) => {
  const { id } = req.user;
  const contactId = req.params.contactId;

  User.findById(id, (error, user) => {
    if (!error) {
      const contact = user.contacts.id(contactId);
      if (contact) {
        if (contact.lastViewed === new Date().getDay()) {
          contact.viewsPerDay[contact.viewsPerDay.length - 1] = {
            ...contact.viewsPerDay[contact.viewsPerDay.length - 1],
            views:
              contact.viewsPerDay[contact.viewsPerDay.length - 1].views + 1,
          };
        } else {
          contact.viewsPerDay.push({
            date: new Date().toDateString(),
            views: 1,
          });
        }

        contact.views += 1;
        contact.lastViewed = new Date().getDay();

        user.markModified("contacts");
        user.save((err, result) => {
          if (!err) {
            return res.status(200).json(contact);
          } else {
            return res.status(400).json({ message: err });
          }
        });
      } else {
        return res.status(400).json({ message: "Contact doesn't exists." });
      }
    } else {
      return res.status(400).json({ message: error });
    }
  });
});

router.delete("/delete-contact/:contactId", (req, res) => {
  try {
    const { id } = req.user;
    const contactId = req.params.contactId;
    User.findById(id, (err, user) => {
      if (!err) {
        const contact = user.contacts.id(contactId);
        if (contact) {
          contact.remove((removeerr, removresult) => {
            if (removeerr) {
              res.status(400).json({ message: removeerr.message });
            }
          });
          user.markModified();
          user.save((saveerr, result) => {
            if (!err) {
              return res.status(200).json({ message: "Contact Deleted." });
            } else {
              return res.status(400).json({ message: saveerr });
            }
          });
        } else {
          return res.status(400).json({ message: "Contact doesn't exists." });
        }
      } else {
        return res.status(400).json({ message: err });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/modify-contact/:contactId", (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.user;
    const contactId = req.params.contactId;
    User.findById(id, (error, user) => {
      if (!error) {
        const contact = user.contacts.id(contactId);
        let modified = false;
        if (contact) {
          if (payload.photo) {
            contact.photo = payload.photo;
            modified = true;
          }

          if (payload.firstName) {
            contact.firstName = payload.firstName;
            modified = true;
          }

          if (payload.middleName) {
            contact.middleName = payload.middleName;
            modified = true;
          }

          if (payload.lastName) {
            contact.lastName = payload.lastName;
            modified = true;
          }

          if (payload.email) {
            contact.email = payload.email;
            modified = true;
          }

          if (payload.mobileNum) {
            contact.mobileNum = payload.mobileNum;
            modified = true;
          }

          if (payload.landlineNum) {
            contact.landlineNum = payload.landlineNum;
            modified = true;
          }

          if (payload.notes) {
            contact.notes = payload.notes;
            modified = true;
          }

          if (modified) {
            contact.dateModified = new Date();
            user.markModified("contacts");
            user.save((saveerr, result) => {
              if (!err) {
                return res.status(200).json(contact);
              } else {
                return res.status(400).json({ message: saveerr });
              }
            });
          } else {
            return res.status(200).json(contact);
          }
        } else {
          return res.status(400).json("Contact doesn't exists.");
        }
      } else {
        return res.status(400).json({ message: error });
      }
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
