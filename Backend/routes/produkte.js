const express = require('express');
// Create a router instance
var router = express.Router();

router.get("/produkte/alle", (request, response) => {
    // Write "Hello World" into the response object
    response.send("Hello World3!");
  });

module.exports = router;