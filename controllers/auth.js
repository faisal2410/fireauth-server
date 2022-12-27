const admin =require("../firebase");
const User =require("../models/user");

exports.currentUser = async (req, res) => {
  console.log("CURRENT USER RETURNING FROM req.currentUser", req.currentUser);
  res.json(req.currentUser);
};

exports.privateRoute = async (req, res) => {
  console.log("REQ HEADERS TOKEN IN PRIVATE ROUTE", req.headers.token);
  if (req.currentUser) {
    res.json({
      ok: true,
    });
  } else {
    res.json({
      ok: false,
    });
  }
};
