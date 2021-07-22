const express = require("express");
const Joi = require("joi");
const router = express.Router();

const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      // minlength: 5,
      // maxlength: 50,
    },
  })
);

const validateGenre = (genre) => {
  const schema = Joi.object({ name: Joi.string().required() });
  return schema.validate(genre);
};

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  return res.send(genres);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const genre = await Genre.findById(id);

    return res.send(genre);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(404);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const body = req.body;
  const { value, error } = validateGenre(body);

  if (error) {
    return res.sendStatus(404);
  }

  try {
    const genre = await Genre.findByIdAndUpdate(id, body, { new: true });
    console.log(genre);
    return res.send(genre);
  } catch (err) {
    console.log(err.message, err);
    return res.sendStatus(404);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  console.log(body);
  const { value, error } = validateGenre(body);

  console.log(error);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  let genre = new Genre({ name: body.value });
  genre = await genre.save();
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const genre = await Genre.findByIdAndRemove(id);
    return res.send(genre);
  } catch (err) {
    return res.sendStatus(404);
  }
});

module.exports = router;
