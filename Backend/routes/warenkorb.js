const express = require('express');
// Create a router instance
var router = express.Router();

router.post("/warenkorb", (req, res) => {
    // Write "Hello World" into the response object
    res.send("Hello World3!");
  });

module.exports = router;