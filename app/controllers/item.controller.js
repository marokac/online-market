/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const db = require("../models");
const Item = db.items;

// Create and Save a new Item
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Item
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    dealerId: req.body.dealerId,
    imgUrls: req.body.imgUrls,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
  });

  // Save Item in the database
  item
    .save(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item.",
      });
    });
};

// Retrieve all Items from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Item.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Item.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Item with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Item with id=" + id });
    });
};

// Update a Item by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found!`,
        });
      } else res.send({ message: "Item was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Item with id=" + id,
      });
    });
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Item.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Item with id=${id}. Maybe Item was not found!`,
        });
      } else {
        res.send({
          message: "Item was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Item with id=" + id,
      });
    });
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
  Item.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Items were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all items.",
      });
    });
};

// Find all by make Items
exports.findAllByMake = (req, res) => {
 const make = req.params.make;
  Item.find({ make: make })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items.",
      });
    });
};

