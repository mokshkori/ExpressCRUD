const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

const router = express.Router();

const Customer = mongoose.model("Customer", {
  name: { type: String, required: true },
  isGold: { typer: boolean, default: false },
  phone: { type: String, required: true },
});

router.get("/", (req, res) => {
  const customers = Customer.find();
  return res.send(customers);
});

module.exports = router;
