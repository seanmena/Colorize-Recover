// const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const router = require("express").Router();
const express = require("express");
const path = require("path");

router.use(express.static(path.join(__dirname, "../public")));

router.get("/", isAuthenticated, (req, res) => {
  console.log("hello2");
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;