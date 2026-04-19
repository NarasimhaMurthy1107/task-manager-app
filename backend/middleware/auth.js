const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const header = req.headers.authorization; // 🔥 change here

    if (!header) {
      return res.status(401).json({ msg: "No token" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, "mysecret123");

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err); // 🔥 add this for debug
    return res.status(401).json({ msg: "Invalid token" });
  }
};