const express = require('express');
// Create a router instance
var router = express.Router();

router.get("/reservierungen", (req, res) => {
    // Write "Hello World" into the response object
    res.send("Hello World3!");
  });

router.delete("/reservierungen/id"), (req, res) =>{
  res.send("Hello World");
}

router.post("/reservierungen/id"), (req, res) =>{
  res.send("Hello World");
}

router.patch("/reservierungen/id"), (req, res) =>{
  res.send("Hello World");
}

module.exports = router;